import { observable, action, computed } from "mobx";
import { fromPairs } from 'lodash';
import { flatten } from 'lodash';
import moment from 'moment';

const query = {
  me: {
    resource: 'me.json',
    params: {
      fields: '*,organisationUnits[*]'
    }
  },
  program: {
    resource: `programs/vf8dN49jprI`,
    params: {
      fields: 'organisationUnits[id,name],programStages[programStageDataElements[displayInReports,dataElement[id,name]]]'
    }
  },
  options: {
    resource: 'optionSets.json',
    params: {
      fields: 'id,code,options[code,name]',
      paging: 'false',
      filter: 'code:in:[SX01,YN01,MD,PD01,TI01]'
    }
  }
}

class Store {
  @observable engine: any;
  @observable userOrgUnits: any = [];
  @observable selectedOrgUnit: any;
  @observable programs = [];
  @observable selectedNationality: any;
  @observable optionSets: any
  @observable page = 1;
  @observable pageSize = 10;
  @observable total = 0;
  @observable program = 'vf8dN49jprI';
  @observable programStage = 'aKclf7Yl1PE';
  @observable attributeCC = 'UjXPudXlraY';
  @observable data: any;
  @observable sorter = 'created:desc';
  @observable search = '';
  @observable currentPage = '1';
  @observable programOrganisationUnits = [];
  @observable currentEvent: any;
  @observable viewMode = false;
  @observable editing = false;
  @observable availableDataElements = [];

  @action showEvents = () => {
    this.data = null;
    this.edit();
    this.currentEvent = null;
    this.editing = false;
    this.currentPage = '1';
  };
  @action showForm = () => this.currentPage = '2';
  @action setEngine = (engine: any) => this.engine = engine;
  @action edit = () => this.viewMode = false;
  @action view = () => this.viewMode = true;
  @action setCurrentEvent = (event: any) => this.currentEvent = event;
  @action setSelectedNationality = async (nationality: any) => {
    try {
      this.selectedNationality = nationality
      if (this.canInsert) {
        await this.queryEvents();
      } else {
        this.data = null;
      }
    } catch (e) {
      console.log(e);
    }
  };

  @action
  loadUserOrgUnits = async () => {
    try {
      const data = await this.engine.query(query);
      this.userOrgUnits = data.me.organisationUnits;
      const options = data.options.optionSets.filter((o: any) => {
        return !!o.code
      }).map((optionSet: any) => {
        return [optionSet.code, optionSet.options]
      });
      const units = data.program.organisationUnits;
      this.programOrganisationUnits = units;
      this.optionSets = fromPairs(options);
      const programStage = data.program.programStages[0];
      this.availableDataElements = programStage.programStageDataElements.map((de: any) => {
        return { ...de.dataElement, selected: de.displayInReports };
      });
    } catch (e) {
      console.log(e);
    }
  }

  @action
  loadOrganisationUnitsChildren = async (parent: string) => {
    const query = {
      organisations: {
        resource: `organisationUnits.json`,
        params: {
          filter: `id:in:[${parent}]`,
          paging: 'false',
          fields: 'children[id,name,path,leaf]'
        }
      },
    }
    try {
      const data = await this.engine.query(query);
      const found = data.organisations.organisationUnits.map((unit: any) => {
        return unit.children.map((child: any) => {
          return { ...child, pId: parent }
        })
      });
      const all = flatten(found);
      this.userOrgUnits = [...this.userOrgUnits, ...all];
    } catch (e) {
      console.log(e);
    }
  }

  @action setSelectedOrgUnit = async (val: any) => {
    try {
      this.selectedOrgUnit = val;
      if (this.canInsert) {
        await this.queryEvents();
      } else {
        this.data = null;
      }
    } catch (e) {
      console.log(e);
    }
  }

  @action queryEvents = async () => {
    if (this.canInsert) {
      const query1 = {
        events: {
          resource: 'events/query.json',
          params: {
            page: this.page,
            pageSize: this.pageSize,
            programStage: this.programStage,
            orgUnit: this.selectedOrgUnit,
            totalPages: 'true',
            attributeCc: this.attributeCC,
            attributeCos: this.selectedNationality,
            includeAllDataElements: 'true',
            order: this.sorter,
            query: this.search === '' ? '' : `LIKE:${this.search}`,

          }
        }
      }
      try {
        const data = await this.engine.query(query1);
        this.data = data.events;
        this.data.headers = this.data.headers.map((a: any, i: number) => {
          return {
            ...a,
            i
          }
        });
        this.total = this.data.metaData.pager.total
      } catch (e) {
        console.log(e);
      }
    }
  }


  @action handleChange = async (pagination: any, filters: any, sorter: any) => {
    const order = sorter.field && sorter.order ? `${sorter.field}:${sorter.order === 'ascend' ? 'asc' : 'desc'}` : 'created:desc';
    const page = pagination.pageSize !== this.pageSize || order !== this.sorter ? 1 : pagination.current;
    this.sorter = order;
    this.page = page;
    this.pageSize = pagination.pageSize

    try {
      await this.queryEvents()
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
  };

  @action addEvent = async (form: any) => {
    const { eventDate, ...rest } = form;
    const dataValues = Object.entries(rest).map(([dataElement, value]) => {
      if (value instanceof moment) {
        if (dataElement === 'i8rrl8YWxLF') {
          value = moment(value).format('YYYY-MM-DDTHH:mm:ss.SSSZ')

        } else {
          value = moment(value).format('YYYY-MM-DD')
        }
      }
      return {
        dataElement,
        value
      }
    }).filter((dv) => !!dv.value);

    let event: any = {
      attributeCategoryOptions: this.selectedNationality,
      orgUnit: this.selectedOrgUnit,
      program: this.program,
      programStage: this.programStage,
      eventDate: moment(eventDate).format('YYYY-MM-DD'),
      dataValues
    }

    let createMutation: any = {
      type: 'create',
      resource: 'events',
      data: event
    }
    if (this.editing && this.currentEvent) {
      event = { ...event, event: this.currentEvent[0] }
      createMutation = { ...createMutation, data: event }
    }
    try {
      await this.engine.mutate(createMutation);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
    this.showEvents();
  }

  @action deleteEvent = async () => {
    try {
      if (this.currentEvent) {
        const createMutation = {
          type: 'delete',
          resource: 'events',
          id: this.currentEvent[0]
        }
        await this.engine.mutate(createMutation);
        this.showEvents();
      }

    } catch (e) {
      console.log(e);
    }
  }

  @action editEvent = () => {
    this.editing = true;
    this.edit();
    this.showForm();
  }

  @action setAvailableDataElements = (val: any) => {
    this.availableDataElements = val;
  }

  @action includeColumns = (id: any) => (e: any) => {
    const elements = this.availableDataElements.map((col: any) => {
      if (col.id === id) {
        return { ...col, selected: e.target.checked }
      }
      return col;
    });
    this.setAvailableDataElements(elements);
  }

  @computed
  get organisationUnits() {
    const units = this.userOrgUnits.map((unit: any) => {
      return { id: unit.id, pId: unit.pId || '', value: unit.id, title: unit.name, isLeaf: unit.leaf }
    });
    return units;
  }
  @computed
  get processedPrograms() {
    return this.programs.map(({ id, name }) => {
      return { id, name }
    })
  }

  @computed get columns() {
    if (this.data && this.data.headers.length > 0 && this.data.rows.length > 0) {
      return this.availableDataElements.filter((de: any) => de.selected).map((col: any) => {
        const found = this.data.headers.find((c: any) => {
          return col.id === c.name;
        });
        return {
          key: found.name,
          title: found.column,
          dataIndex: found.name,
          render: (text: any, row: any) => {
            return row[found.i]
          }
        }
      });
    }
    return []
  }

  @computed get currentOrganisation() {
    const current: any = this.programOrganisationUnits.find((u: any) => u.id === this.selectedOrgUnit);
    if (current) {
      return current.name;
    }
    return ''
  }

  @computed get canInsert() {
    return this.selectedOrgUnit && this.selectedNationality && this.currentOrganisation;
  }

  @computed get defaultValues() {
    const dates = ['eventDate', 'RbrUuKFSqkZ', 'i8rrl8YWxLF', 'j5TIQx3gHyF', 'U18Tnfz9EKd']
    if (this.data && this.data.headers.length > 0 && this.currentEvent) {
      const d = this.data.headers.map((c: any) => {
        let value = this.currentEvent[c.i];
        if (dates.indexOf(c.name) !== -1) {
          value = moment(value);
        } else if (value === 'true') {
          value = true;
        } else if (value === 'false') {
          value = false;
        }
        return [c.name, value];
      }).filter((v: any) => !!v[1]);
      return fromPairs(d);
    }
    return {};
  }
}

export const store = new Store();