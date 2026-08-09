import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

import CustomizedSnackbar from '../../components/common/snakebar/CustomizedSnackbar';
import { fetchEntity } from '../../services/httpService';

const POLL_INTERVAL_MS = 8000;

/**
 * Mount this once anywhere inside the authenticated part of the app
 * (e.g. MainLayout) to get a popup whenever a new notification shows up.
 *
 * This polls the API on an interval rather than using a persistent
 * WebSocket connection, so it works on any host - including serverless
 * platforms like Vercel that don't support long-lived connections.
 */
class NotificationListener extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: '',
    };
    this.lastSeenId = null;
    this.pollTimer = null;
  }

  componentDidMount() {
    this.poll();
    this.pollTimer = setInterval(this.poll, POLL_INTERVAL_MS);
  }

  componentWillUnmount() {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
    }
  }

  poll = () => {
    fetchEntity('notifications')
      .then((response) => {
        const notifications = response.data.data;

        if (!notifications || notifications.length === 0) {
          return;
        }

        // Notifications are returned newest-first.
        const newest = notifications[0];

        if (this.lastSeenId === null) {
          // First load: just remember where we are, don't pop up
          // everything that already existed before this page opened.
          this.lastSeenId = newest.id;
          return;
        }

        if (newest.id !== this.lastSeenId) {
          this.lastSeenId = newest.id;
          this.setState({ open: true, message: newest.message });
        }
      })
      .catch(() => {
        // Silently ignore - we'll just try again on the next poll.
      });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    const { open, message } = this.state;

    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        autoHideDuration={6000}
        onClose={this.handleClose}
      >
        <CustomizedSnackbar variant="info" message={message} />
      </Snackbar>
    );
  }
}

export default NotificationListener;
