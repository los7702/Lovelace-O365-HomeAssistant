import {
    LitElement,
    html,
    css,
  } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";
  
  
  
  
  class O365ToDoCard extends LitElement {
    static get properties() {
      return {
        hass: {},
        config: {},
      };
    }
  
    
    render() {
      if (this.hass.states[this.config.entity].attributes.all_tasks) {
  
        
        return html`
            <ha-card outlined header="${this.config.title}">
            <ha-navigation-list hassecondary>
            <mwc-list>
            ${this.hass.states[this.config.entity].attributes.all_tasks.map(ent => {
                let compdate =  new Date();
                compdate.setDate(compdate.getDate() - 1);
  
                if (!ent.completed || compdate < new Date(ent.completed)) {
                  
               
                var thtml = html`
                <ha-list-item twoline graphic="medium" mwc-list-item aria-disabled="false" >
                <ha-checkbox slot="graphic" .checked=${ent.completed ? true:false} 
                itemId="${ent.task_id}" 
                @change="${(ev) => this._toggle(ent)}">
                >
                </ha-checkbox>
  
                  <span>${ent.subject}</span>
                  <div slot="secondary">
                  
                  ${ent.description}
                  </div>
                </ha-list-item>
                `
                return thtml
                }
            })}
            </mwc-list>
            </ha-navigation-list>
            </<ha-config-navigation>
            </ha-card>
      `;} 
      else 
      {return '';}
    }
  
  
    
  
    _toggle(item) {
      this.hass.callService("script", "o365_toggle_task", {
  
        todo_list_id: this.config.entity,
        task_id: item.task_id,
        completed: !item.completed ? true : false
  
      });
    }  
  
      // The user supplied configuration. Throw an exception and Home Assistant
      // will render an error card.
      setConfig(config) {
        if (!config.entity) {
          throw new Error("You need to define an entity");
        }
        this.config = config;
      }
    
      // The height of your card. Home Assistant uses this to automatically
      // distribute all cards over the available columns.
      getCardSize() {
        return this.hass.states[this.config.entity].attributes.all_tasks.length +1;
      }
  
  }
  
  
    customElements.define("o365-todo-card", O365ToDoCard);
  