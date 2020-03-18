import { observer } from "mobx-react"
import React, { useEffect } from "react";
import { DataEntryForm } from "./components/Form";
import { HeaderBar } from '@dhis2/ui-widgets';
import { useDataEngine } from '@dhis2/app-runtime';

import { store } from './Store'
import { OrgUnitTree } from "./components/OrgUnitTree";
import { StoreContext } from "./Context";
import { EventList } from "./components/EventList";

export const App = observer(() => {
  const engine = useDataEngine();
  store.setEngine(engine);

  useEffect(() => {
    async function test() {
      await store.loadUserOrgUnits();
    }
    test();
  })

  return (
    <StoreContext.Provider value={store}>
      <HeaderBar appName={'HMIS 100 - Medical Certificate of Cause of Death'}
        style={{
          left: 0,
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 1000,
        }}
      />
      <div className="p-2">
        <OrgUnitTree />
        {store.currentPage === '2' ? <DataEntryForm /> : <EventList />}
      </div>
    </StoreContext.Provider>
  )
})