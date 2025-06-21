import axios from 'axios';
import { DOGGO_API_BASE_URL } from '../../configuration/variables';
import { Message, Service, SittersResponse } from './types';

class DoggoClient {
  private readonly instance;

  constructor() {
    this.instance = axios.create({
      baseURL: DOGGO_API_BASE_URL,
    });
  }

  async sendMessage({
    content,
    clientId,
    sitterId,
  }: {
    content: string;
    sitterId: number;
    clientId: number;
  }): Promise<boolean> {
    try {
      const response = (
        await this.instance.post(
          '/messages',
          { content, client_id: clientId, sitter_id: sitterId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
            },
          },
        )
      ).data;

      return !!!response.message_id;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async retrieveAllMessages(): Promise<Message[]> {
    return (
      await this.instance.get('/messages', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
      })
    ).data;
  }

  async findAllSitters(): Promise<SittersResponse> {
    return (
      await this.instance.get('/sitters', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
      })
    ).data;
  }

  async getAvailabilityBySitterId(sitterId: number): Promise<{
    days_available: {
      appointment_date: string;
      appointment_range: string;
    }[];
  }> {
    return (
      await this.instance.get(`/schedule/${sitterId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
      })
    ).data;
  }

  async scheduleAppointment({
    sitterId,
    clientId,
    appointmentDate,
    appointmentRange,
  }: {
    sitterId: number;
    clientId: number;
    appointmentDate: string;
    appointmentRange: string;
  }): Promise<boolean> {
    return (
      await this.instance.post(
        `/schedule/${sitterId}`,
        {
          client_id: clientId,
          appointment_date: appointmentDate,
          appointment_range: appointmentRange,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
          },
        },
      )
    ).data;
  }

  async findAllServices(): Promise<Service[]> {
    return (
      await this.instance.get('/services', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
      })
    ).data;
  }
}

export const doggoClient = new DoggoClient();
