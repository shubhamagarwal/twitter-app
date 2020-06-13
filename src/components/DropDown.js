import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 250,
    }
  }));

const Dropdown = (props) => {
    const {handleDropDownChange, searchType} = props;
    const classes = useStyles();
    return (
        <>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">Search By</InputLabel>
                <Select
                native
                onChange={handleDropDownChange}
                value={searchType}
                label="Search"
                inputProps={{
                    name: 'Search',
                    id: 'outlined-age-native-simple',
                }}
                >

                <option value={'location'}>Location</option>
                <option value={'screenName'}>Screen Name</option>
                </Select>
            </FormControl>
        </>
    )
}

Dropdown.prototype = {
    handleDropDownChange: PropTypes.func,
    searchType: PropTypes.string
}

Dropdown.defaultProps = {
    searchType: 'location'
}
export default React.memo(Dropdown);