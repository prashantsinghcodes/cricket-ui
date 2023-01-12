import React from "react";
import './App.css';
class App extends React.Component {

	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			summaryList: [],
			DataisLoaded: false
		};
	}

	// ComponentDidMount is used to
	// execute the code
	componentDidMount() {
		fetch(
"http://localhost:8080/cricket/summary")
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					summaryList: json,
					DataisLoaded: true
				});
			})
	}
	render() {
		const { DataisLoaded, summaryList } = this.state;
		if (!DataisLoaded) return <div>
			<h1> Pleses wait some time.... </h1> </div> ;
    console.log(summaryList)
		return (
		<div className = "App">
			<h1> Match summary </h1> {
				summaryList.map((summary) => (
				<ol key = { summary['team']['team_name'] } >
					{ summary['team']['team_name'] } - {summary['team']['team_score']}/{summary['team']['total_wickets_fallen']} ({summary['team']['overs_played']})
          <div>
  
            {summary.players.map(function(player) {
            let string = player.player_name + " " + player.runs_scored + "(" + player.balls_faced + ")"
            return <ol>{string}</ol>;
          })}
           
          </div>
					</ol>
				))
			}
		</div>
	);
}
}

export default App;
