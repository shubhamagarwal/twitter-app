import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Tweets = (props) => {
  const classes = useStyles();
  const { tweets } = props;
  console.log('inside Tweets');
  return (
    <>
    {tweets.length ? 
    (<TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>Profile Image</b></TableCell>
            <TableCell align="right"><b>Screen Name</b></TableCell>
            <TableCell align="right"><b>Tweet</b></TableCell>
            <TableCell align="right"><b>Location</b></TableCell>
            <TableCell align="right"><b>Followers Count</b></TableCell>
            <TableCell align="right"><b>Retweet Count</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tweets.length && tweets.map((tweet) => (
            <TableRow key={tweet.id}>
              <TableCell component="th" scope="row">
                <img src={tweet.profileImage} alt={tweet.screenName} />
              </TableCell>
              <TableCell align="right">{tweet.screenName}</TableCell>
              <TableCell align="right">{tweet.text}</TableCell>
              <TableCell align="right">{tweet.location}</TableCell>
              <TableCell align="right">{tweet.followersCount}</TableCell>
              <TableCell align="right">{tweet.retweetCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>): ''}
    </>
  )
}

export default React.memo(Tweets);