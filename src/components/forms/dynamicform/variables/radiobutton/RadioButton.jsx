import React from 'react';
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

export class RadioButton extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            referenceKey: this.props.referenceKey
        }

        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Handle selection change
     * @param event input change event
     */
    handleChange(event) {
        this.setState({
            value: event.target.value
        }, ()=>{
            this.props.onSelectionChange(this.state);
        });
    }

    render() {
        return (
            <RadioGroup aria-label="gender"
                name="gender1"
                value={this.state.value}
                onChange={this.handleChange}>
                {
                    this.props.options?.map((val) => (
                        <FormControlLabel value={JSON.stringify(val)}
                            key={`${val.key}_radioButton`}
                            control={<Radio />}
                            label={val.value}
                        />
                    ))
                }
            </RadioGroup>
        )
    }
}