import React, {Component} from 'react'; 
import { Marker, InfoWindow } from "react-google-maps";


export const waypns = [];
const waypnsName = [];

class MarkerMap extends Component {
    
constructor(props){
    super(props);

    this.state = {
        isOpen: false
    }

}

handleToggleOpen = () => {
    this.setState({
        isOpen: true,
    });
}

handleToggleClose = () => {
    this.setState({
        isOpen: false
    });
}

addList = () => {
        if(waypnsName.indexOf(this.props.name) === -1) {
            waypns.push([this.props.position.lat, this.props.position.lng]);
            waypnsName.push(this.props.name);
            const parent = document.querySelector(".waypoints");
            const li = document.createElement("li");
            const div = document.createElement("div");
            const p = document.createElement("p");
            const btn = document.createElement("button");
            parent.appendChild(li);
            li.appendChild(div);
            div.appendChild(p);
            div.appendChild(btn);
            p.className = "waypoints__text";
            p.innerHTML = this.props.name;
            btn.className = "waypoints__button_delete";
            btn.addEventListener("click", function(){
                li.remove();
                const index = waypnsName.indexOf(p.textContent);
                waypnsName.splice(index, 1);
                waypns.splice(index, 1);
                console.log(waypns);
            });
        }
}

render() {

return (
        <Marker
            id={this.props.id}
            position={{ lat: this.props.position.lat, lng: this.props.position.lng}}
            name={this.props.name}
            type={this.props.type}
            onClick={() => this.handleToggleOpen()}
        >

        {
        this.state.isOpen &&
         <InfoWindow onCloseClick={() => this.handleToggleClose()}>
            <div>
             <p style={{textAlign: "center", fontWeight: "bold"}}>{this.props.type}</p>
             <p>{this.props.name}</p>
             <button onClick={() => this.addList()}>Добавить</button>
             </div>
         </InfoWindow>
        }

        </Marker>
    )
}
}

export default MarkerMap;