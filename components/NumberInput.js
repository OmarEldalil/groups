import React from 'react';
import {TextInput} from 'react-native';
import PropTypes from 'prop-types';

class NumberInput extends React.Component {

    state = {
        min: this.props.min || null,
        max: this.props.max || null,
        name: this.props.name || 'Value',
    };
    validateMinAndMax = (val) => {
        val = (val.replace(/\D/g, '') === '') ? '' : Number(val.replace(/\D/g, ''));
        let errors = [];
        if ((val !== '') && this.state.max && val > this.state.max) {
            errors.push(`${this.state.name} must be less than ${this.state.max}`);
        }
        if ((val !== '') && this.state.min && val < this.state.min) {
            errors.push(`${this.state.name} must be greater than ${this.state.min}`);
        }
        this.props.onChangeText(val.toString(), errors);
    };

    render() {
        return (
            <TextInput {...{...this.props, onChangeText: this.validateMinAndMax}} />
        );
    }
}

NumberInput.propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    name: PropTypes.string,
};

export default NumberInput;
