
import React from 'react';
import mapboxgl from 'mapbox-gl';

interface Job {
  id: string;
  title: string;
  customer: string;
  address: string;
  coordinates: [number, number];
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  type: 'job' | 'appointment';
  time: string;
  assignedTo?: string;
  employeeColor?: string;
}

interface Employee {
  id: string;
  name: string;
  coordinates: [number, number];
  color: string;
  status: 'active' | 'break' | 'inactive';
}

interface MapMarkersProps {
  map: mapboxgl.Map;
  jobs: Job[];
  employees?: Employee[];
  showEmployeeLocations?: boolean;
  userLocation?: [number, number] | null;
  theme: string;
  compact?: boolean;
}

export const useMapMarkers = () => {
  const getMarkerColor = (status: string, type: string, theme: string) => {
    if (type === 'appointment') {
      switch (status) {
        case 'scheduled':
          return '#8B5CF6';
        case 'in-progress':
          return '#EC4899';
        case 'completed':
          return '#059669';
        case 'cancelled':
          return '#6b7280';
        default:
          return '#6b7280';
      }
    } else {
      switch (status) {
        case 'scheduled':
          return theme === 'dark' ? '#60a5fa' : '#3b82f6';
        case 'in-progress':
          return theme === 'dark' ? '#fb923c' : '#f97316';
        case 'completed':
          return theme === 'dark' ? '#34d399' : '#10b981';
        case 'cancelled':
          return theme === 'dark' ? '#9ca3af' : '#6b7280';
        default:
          return theme === 'dark' ? '#9ca3af' : '#6b7280';
      }
    }
  };

  const addUserLocationMarker = (map: mapboxgl.Map, userLocation: [number, number], theme: string) => {
    const userMarker = document.createElement('div');
    userMarker.style.width = '16px';
    userMarker.style.height = '16px';
    userMarker.style.borderRadius = '50%';
    userMarker.style.backgroundColor = theme === 'dark' ? '#ef4444' : '#dc2626';
    userMarker.style.border = `2px solid ${theme === 'dark' ? '#1f2937' : 'white'}`;
    userMarker.style.boxShadow = theme === 'dark' ? '0 2px 4px rgba(0,0,0,0.5)' : '0 2px 4px rgba(0,0,0,0.3)';

    const userPopup = new mapboxgl.Popup({ offset: 15 })
      .setHTML(`<div style="padding: 4px; color: ${theme === 'dark' ? '#f3f4f6' : '#1f2937'}; font-size: 12px;"><strong>Your Location</strong></div>`);

    new mapboxgl.Marker(userMarker)
      .setLngLat(userLocation)
      .setPopup(userPopup)
      .addTo(map);
  };

  const addEmployeeMarkers = (map: mapboxgl.Map, employees: Employee[], theme: string) => {
    employees.forEach((employee) => {
      const employeeMarker = document.createElement('div');
      employeeMarker.style.width = '14px';
      employeeMarker.style.height = '14px';
      employeeMarker.style.borderRadius = '50%';
      employeeMarker.style.backgroundColor = employee.color;
      employeeMarker.style.border = `2px solid ${theme === 'dark' ? '#1f2937' : 'white'}`;
      employeeMarker.style.boxShadow = theme === 'dark' ? '0 1px 3px rgba(0,0,0,0.5)' : '0 1px 3px rgba(0,0,0,0.3)';
      employeeMarker.style.cursor = 'pointer';

      if (employee.status === 'break') {
        employeeMarker.style.border = `2px solid ${theme === 'dark' ? '#fbbf24' : '#f59e0b'}`;
      } else if (employee.status === 'inactive') {
        employeeMarker.style.opacity = '0.5';
      }

      const employeePopupContent = `
        <div style="padding: 8px; max-width: 160px; color: ${theme === 'dark' ? '#f3f4f6' : '#1f2937'}; font-size: 11px;">
          <h4 style="font-weight: bold; margin: 0 0 4px 0;">${employee.name}</h4>
          <span style="
            display: inline-block;
            padding: 2px 6px;
            font-size: 10px;
            border-radius: 4px;
            background-color: ${employee.color}20;
            color: ${employee.color};
            font-weight: 500;
            text-transform: capitalize;
          ">
            ${employee.status}
          </span>
        </div>
      `;

      const employeePopup = new mapboxgl.Popup({ offset: 15 }).setHTML(employeePopupContent);

      new mapboxgl.Marker(employeeMarker)
        .setLngLat(employee.coordinates)
        .setPopup(employeePopup)
        .addTo(map);
    });
  };

  const addJobMarkers = (map: mapboxgl.Map, jobs: Job[], theme: string, compact: boolean = false) => {
    jobs.forEach((job) => {
      const markerEl = document.createElement('div');
      markerEl.style.width = compact ? '18px' : '24px';
      markerEl.style.height = compact ? '18px' : '24px';
      markerEl.style.borderRadius = job.type === 'appointment' ? '3px' : '50%';
      
      const markerColor = job.employeeColor || getMarkerColor(job.status, job.type, theme);
      markerEl.style.backgroundColor = markerColor;
      markerEl.style.border = `2px solid ${theme === 'dark' ? '#1f2937' : 'white'}`;
      markerEl.style.boxShadow = theme === 'dark' ? '0 1px 3px rgba(0,0,0,0.5)' : '0 1px 3px rgba(0,0,0,0.3)';
      markerEl.style.cursor = 'pointer';

      if (job.status === 'cancelled') {
        markerEl.style.opacity = '0.6';
      }

      if (job.type === 'appointment') {
        markerEl.style.clipPath = 'polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)';
      }

      const popupContent = `
        <div style="padding: 8px; max-width: 200px; color: ${theme === 'dark' ? '#f3f4f6' : '#1f2937'}; font-size: 11px;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
            <h4 style="font-weight: bold; margin: 0;">${job.title}</h4>
            <span style="
              display: inline-block;
              padding: 1px 4px;
              font-size: 9px;
              border-radius: 3px;
              background-color: ${job.type === 'appointment' ? '#8B5CF6' : '#3b82f6'};
              color: white;
              text-transform: uppercase;
              font-weight: 500;
            ">
              ${job.type}
            </span>
          </div>
          <p style="margin: 2px 0; color: ${theme === 'dark' ? '#d1d5db' : '#666'}; font-size: 10px;">${job.customer}</p>
          <p style="margin: 2px 0; font-size: 10px;">${job.address}</p>
          <p style="margin: 2px 0; font-size: 9px; color: ${theme === 'dark' ? '#d1d5db' : '#666'};">${job.time}</p>
          <span style="
            display: inline-block;
            padding: 2px 6px;
            font-size: 9px;
            border-radius: 4px;
            background-color: ${markerColor}20;
            color: ${markerColor};
            font-weight: 500;
            text-transform: capitalize;
          ">
            ${job.status.replace('-', ' ')}
          </span>
        </div>
      `;

      const popup = new mapboxgl.Popup({ offset: 15 }).setHTML(popupContent);

      new mapboxgl.Marker(markerEl)
        .setLngLat([job.coordinates[0], job.coordinates[1]])
        .setPopup(popup)
        .addTo(map);
    });
  };

  return {
    addUserLocationMarker,
    addEmployeeMarkers,
    addJobMarkers
  };
};
