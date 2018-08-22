import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import './FilterMonth.css';


const FilterMonth = (props) =>{

    const { onChangeMonth, onChangeMonthHandler, months} = props;
    const options = [{ value: months[0].name, label: 'January' }, { value: months[1].name, label: 'Febuary' }, { value: months[2].name, label: 'March' }, { value: months[3].name, label: 'April' },
              { value: months[4].name, label: 'May' }, { value: months[5].name, label: 'June' }, { value: months[6].name, label: 'July' }, { value: months[7].name, label: 'August' },
              { value: months[8].name, label: 'September' }, { value: months[9].name, label: 'October' }, { value: months[10].name, label: 'November' }, { value: months[11].name, label: 'December' }];
		return(
    <div>
     <MediaQuery query="(min-width: 800px)">
          <div>
              <Select name="form-field-name" className="filterMonth" value={onChangeMonth} onChange={onChangeMonthHandler} options={options}/>
          </div>
    </MediaQuery>
    <MediaQuery query="(max-width: 799px)">

    </MediaQuery>
    </div>
		)
}

FilterMonth.propTypes = {
  onChangeMonth: PropTypes.string,
  onChangeMonthHandler: PropTypes.func,
  options: PropTypes.array
}

export default FilterMonth;
