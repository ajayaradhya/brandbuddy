import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
  Box,
  Typography,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useTheme,
} from '@mui/material';

const EVENT_TYPES = {
  collaboration_start: {
    label: 'Collaboration Start',
    color: '#2196f3',
    description: 'This collaboration started on this day.',
  },
  collaboration_end: {
    label: 'Collaboration End',
    color: '#f44336',
    description: 'This collaboration ended on this day.',
  },
  followup: {
    label: 'Follow-up',
    color: '#ff9800',
    description: 'This is the scheduled follow-up date.',
  },
  delivery_deadline: {
    label: 'Delivery Deadline',
    color: '#4caf50',
    description: 'Deliverables are due on this date.',
  },
};

const CalendarView = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventTypeFilter, setEventTypeFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const theme = useTheme();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/calendar-view`);
        const formatted = response.data.events.map((event) => {
          const typeMeta = EVENT_TYPES[event.type] || {};
          return {
            ...event,
            backgroundColor: typeMeta.color || theme.palette.grey[600],
            borderColor: typeMeta.color || theme.palette.grey[600],
          };
        });
        setAllEvents(formatted);
        setFilteredEvents(formatted);
      } catch (error) {
        console.error('Failed to fetch calendar events:', error);
      }
    };

    fetchEvents();
  }, [theme.palette.grey]);

  const filterEvents = () => {
    let filtered = [...allEvents];
    if (eventTypeFilter) {
      filtered = filtered.filter((event) => event.type === eventTypeFilter);
    }
    if (brandFilter) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(brandFilter.toLowerCase())
      );
    }
    setFilteredEvents(filtered);
  };

  useEffect(() => {
    filterEvents();
  }, [eventTypeFilter, brandFilter, allEvents]);

  const renderEventWithTooltip = (info) => (
    <Tooltip title={info.event.title}>
      <div style={{ padding: '3px 6px', fontSize: '0.8rem' }}>
        {info.event.title}
      </div>
    </Tooltip>
  );

  const selectedType = selectedEvent?.extendedProps?.type;
  const typeMeta = EVENT_TYPES[selectedType] || {};

  const brandNames = [...new Set(allEvents.map((e) => e.title.split(' - ')[0]))];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        🗓️ Collaboration Calendar
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Event Type</InputLabel>
            <Select
              value={eventTypeFilter}
              onChange={(e) => setEventTypeFilter(e.target.value)}
              label="Event Type"
            >
              <MenuItem value="">All</MenuItem>
              {Object.entries(EVENT_TYPES).map(([key, val]) => (
                <MenuItem key={key} value={key}>
                  {val.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Brand</InputLabel>
            <Select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              label="Brand"
            >
              <MenuItem value="">All</MenuItem>
              {brandNames.map((brand) => (
                <MenuItem key={brand} value={brand}>
                  {brand}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Legend */}
      <Grid container spacing={1} sx={{ mb: 2 }}>
        {Object.entries(EVENT_TYPES).map(([key, { label, color }]) => (
          <Grid item key={key}>
            <Chip label={label} size="small" sx={{ bgcolor: color, color: '#fff' }} />
          </Grid>
        ))}
      </Grid>

      {/* Calendar */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'dayGridMonth,timeGridWeek,timeGridDay',
          center: 'title',
          end: 'today prev,next',
        }}
        height="auto"
        events={filteredEvents}
        eventClick={({ event }) => setSelectedEvent(event)}
        eventContent={renderEventWithTooltip}
      />

      {/* Modal */}
      <Dialog open={!!selectedEvent} onClose={() => setSelectedEvent(null)}>
        <DialogTitle>{selectedEvent?.title}</DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle1">
            <strong>Date:</strong> {selectedEvent?.startStr}
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1 }}>
            <strong>Event:</strong> {typeMeta.label || selectedType}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {typeMeta.description || 'Event related to collaboration milestone.'}
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CalendarView;
