import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'

import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import { LicenseManager } from 'ag-grid-enterprise'

import { Button } from 'react-bootstrap'

import styled from 'styled-components'

const StyledDiv = styled.div`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
`

const AppHeader = styled.div`
  width: 100%;
`

const AppBody = styled.div`
  flex-grow: 1;
  position: relative;
  bottom: 0;
  width: 100%;
  text-align: left;
  color: black;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
`

class SquareRenderer extends Component {
  render() {
    const { value } = this.props
    return (
      <Button bsStyle="primary" bsSize="xs">
        {value}
      </Button>
    )
  }
}

const carMakers = ['Ford', 'Toyota', 'Citroën', 'Mercedes', 'Peugeot', 'Skoda', 'Vauxhall']

// ag-Grid license key: *** THE ACTUAL KEY WAS REPLACED WITH 1111111s ***
LicenseManager.setLicenseKey('KAPPA_Engineering__MultiApp_3Devs29_October_2019__1111111111111111111')

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columnDefs: [
        { headerName: 'Make', field: 'make', sortable: true, resizable: true },
        { headerName: 'Model', field: 'model', sortable: true, editable: true, resizable: true },
        {
          headerName: 'Price',
          field: 'price',
          cellRenderer: 'squareRenderer',
          sortable: false,
        },
      ],
      rowData: [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 },
      ],
      context: { componentParent: this },
      frameworkComponents: {
        squareRenderer: SquareRenderer,
      },
    }
  }

  generateData(numRows) {
    const data = []
    for (let i = 0; i < numRows; ++i) {
      data.push({
        make: carMakers[i % 7],
        model: 'CC' + i + 10,
        price: i + 1251,
      })
    }

    return data
  }

  componentDidMount() {
    this.setState({ rowData: this.generateData(10000) })
  }

  onButtonClick = e => {
    this.gridApi.forEachNode(node => {
      if (node.data.make === 'Ford') {
        node.setSelected(true)
      }
    })
  }

  onCellClicked = e => {
    console.log(e)
  }

  render() {
    return (
      <StyledDiv>
        <AppHeader>
          <h1>ag-Grid React</h1>
        </AppHeader>

        <AppBody>
          <div
            className="ag-theme-balham"
            style={{
              height: '500px',
              width: '100%',
            }}
          >
            <button onClick={this.onButtonClick}>Select Ford rows</button>
            <AgGridReact
              rowSelection="multiple"
              columnDefs={this.state.columnDefs}
              enableRangeSelection
              suppressRowClickSelection
              rowData={this.state.rowData}
              onCellClicked={this.onCellClicked}
              onGridReady={params => (this.gridApi = params.api)}
              frameworkComponents={this.state.frameworkComponents}
            />
          </div>
        </AppBody>
      </StyledDiv>
    )
  }
}

export default App
