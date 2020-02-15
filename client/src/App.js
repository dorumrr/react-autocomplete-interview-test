import React from 'react';
import './App.css';
import { Grid, Typography } from '@material-ui/core';
import Autocomplete from './Autocomplete';
export default function App() {
  const frontend = [
    { name: 'React', url: 'https://reactjs.org/' },
    { name: 'Material-UI', url: 'https://material-ui.com/' },
    { name: 'cross-fetch', url: 'https://github.com/lquixada/cross-fetch', last: true },
  ];
  const backend = [
    { name: 'Node.js', url: 'https://nodejs.org/' },
    { name: 'Express', url: 'https://material-ui.com/' },
    { name: 'PM2', url: 'https://pm2.keymetrics.io/', last: true }
  ];
  return <Grid container justify="center" style={{ marginTop: 50 }}>
    <Grid item>
      <div className="info">
        <Typography paragraph variant="subtitle1" color="primary">Minimal Autocomplete/Suggestion</Typography>
        <Typography variant="body2" color="textSecondary">
          Frontend: {frontend.map((link, i) => <span key={i}><a target="_blank" rel="noopener noreferrer" className="mid-opacity" href={link.url}>{link.name}</a>{!link.last && ', '}</span>)}
        </Typography>
        <Typography paragraph variant="body2" color="textSecondary">
          Backend: {backend.map((link, i) => <span key={i}><a target="_blank" rel="noopener noreferrer" className="mid-opacity" href={link.url}>{link.name}</a>{!link.last && ', '}</span>)}
        </Typography>
        <Typography paragraph variant="body2" color="textSecondary">
          Hosted on a <a target="_blank" rel="noopener noreferrer" className="mid-opacity" href="https://www.ovh.co.uk/vps/">private VPS</a> powered by:<br />
          <a target="_blank" rel="noopener noreferrer" className="mid-opacity" href="https://ubuntu.com/server">Ubuntu Server 18.04</a>, <a target="_blank" rel="noopener noreferrer" className="mid-opacity" href="http://httpd.apache.org/">Apache v2.4</a>, <a target="_blank" rel="noopener noreferrer" className="mid-opacity" href="https://nodejs.org/en/">node 12</a>
        </Typography>
        <Typography variant="subtitle2" color="textPrimary">
          Full code available on <a target="_blank" rel="noopener noreferrer" className="mid-opacity" href="https://github.com/dorumrr/autocomplete-doru-uk">Github</a>.
        </Typography>
      </div>
      <Autocomplete />
    </Grid>
  </Grid>;
}
