import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'

import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'

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

const AppFooter = styled.div`
  width: 100%;
  padding: 5px;
  background-color: whitesmoke;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const FooterRight = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
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

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columnDefs: [
        { headerName: 'Make', field: 'make' },
        { headerName: 'Model', field: 'model', editable: true },
        {
          headerName: 'Price',
          field: 'price',
          suppressSorting: true,
          cellRenderer: 'squareRenderer',
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
    // fetch("https://api.myjson.com/bins/15psn9")
    //   .then(result => result.json())
    //   .then(rowData => this.setState({ rowData }));

    this.setState({ rowData: this.generateData(10000) })
  }

  onButtonClick = e => {
    // const selectedNodes = this.gridApi.getSelectedNodes();
    // const selectedData = selectedNodes.map(node => node.data);
    // const selectedDataStringPresentation = selectedData
    //   .map(node => node.make + " " + node.model)
    //   .join(", ");
    // alert(`Selected nodes: ${selectedDataStringPresentation}`);

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
              enableSorting={true}
              enableFilter={true}
              rowSelection="multiple"
              columnDefs={this.state.columnDefs}
              enableColResize={true}
              enableRangeSelection
              suppressRowClickSelection
              rowData={this.state.rowData}
              onCellClicked={this.onCellClicked}
              onGridReady={params => (this.gridApi = params.api)}
              frameworkComponents={this.state.frameworkComponents}
            />
          </div>
        </AppBody>

        {/* <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Modal</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            TEST
          </Modal.Body>

          <Modal.Footer>
            <Button>Close</Button>
          </Modal.Footer>
        </Modal.Dialog> */}
      </StyledDiv>
    )
  }
}

export default App
