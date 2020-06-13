import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    button: {
        '& > *': {
          margin: theme.spacing(1),
        },
      }
  }));

const Search = (props) => {
    console.log('inside Search');
    const { getSearchValue, handleSearchClick } = props;
    const classes = useStyles();
    return (
        <>
            <form className={classes.root} noValidate autoComplete="off" onChange={getSearchValue}>
                <TextField id="standard-basic" label="Type Here..." />
            </form>
            <div className={classes.button}>
                <Button variant="contained" color="primary" onClick={handleSearchClick}>
                    Search
                </Button>
            </div>
        </>
        
    )
}

Search.prototype = {
  getSearchValue: PropTypes.func,
  handleSearchClick: PropTypes.func
}

export default React.memo(Search);