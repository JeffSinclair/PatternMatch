import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = {
            matchPositions: [], resultLoaded: true,
            subtext : "", text : ""
        };


        this.findMatches = this.findMatches.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);        
        this.handleSubtextChange = this.handleSubtextChange.bind(this);
    }

 
        
      

    static renderMatchesTable(matchPositions) {
        return (
            <table id="resultTable" className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Match Number</th>
                        <th>Position of Match</th>                        
                    </tr>
                </thead>
                <tbody>
                    {matchPositions.map((match,index) =>
                        <tr>
                            <td>{index + 1}</td>                            
                            <td>{match}</td>                            
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let results = this.state.resultLoaded 
            ? Home.renderMatchesTable(this.state.matchPositions)
                : <p><em>Loading...</em></p>

        return (
            <div>
                <h1>Patern Match</h1>
                <div class="row">
                    <div class="label col-2" value={this.state.text}>Text
                    </div>
                    <div class="col-10">
                        <textarea rows="10" class="form-control" onChange={this.handleTextChange} />
                    </div>
                </div>
                <div class="row pt-5">
                        <div class="label col-2">SubText</div>
                        <div class="col-10">
                        <input type="text" class="form-control" onChange={this.handleSubtextChange}/>
                        </div>
                </div>
                <div class="row pt-5">
                    <div class="label col-12 text-right">
                        <button className="btn btn-primary" onClick={this.findMatches}>Match</button>
                    </div>                    
                </div>

                
                <div class="pt-5">
                    {results}
                </div>
            </div>
        );
    }

    handleTextChange(event) {
        this.setState({ text: event.target.value });        
    }


    handleSubtextChange(event) {
        this.setState({ subtext: event.target.value });
    }


    async findMatches() {      

        const response = await fetch('patternmatch', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'                
            },
            body: JSON.stringify({ text: this.state.text, subtext : this.state.subtext }) 
        })        

        const data = await response.json();
        this.setState({ matchPositions: data, resultLoaded: true});
    }
}



