/**
 * API Services
 * Servicios centralizados para llamadas a APIs
 */

interface ApiResponse<T> {
  data?: T;
  error?: string;
  status?: number;
}

class ApiServices {
  private baseUrl: string = '';

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || '';
  }

  /**
   * Configura la URL base para todas las peticiones
   */
  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });

      if (!response.ok) {
        return {
          error: `Error ${response.status}: ${response.statusText}`,
          status: response.status,
        };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Error desconocido en la petición GET',
      };
    }
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, body: unknown, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        return {
          error: `Error ${response.status}: ${response.statusText}`,
          status: response.status,
        };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Error desconocido en la petición POST',
      };
    }
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, body: unknown, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        return {
          error: `Error ${response.status}: ${response.statusText}`,
          status: response.status,
        };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Error desconocido en la petición PUT',
      };
    }
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });

      if (!response.ok) {
        return {
          error: `Error ${response.status}: ${response.statusText}`,
          status: response.status,
        };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Error desconocido en la petición DELETE',
      };
    }
  }

  /**
   * Obtiene repositorios de GitHub
   */
  async getRepos(username: string) {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
    const data = await res.json();
    console.log('GitHub Repos Response:', data);
    return data;
  }

  /**
   * Obtiene información del usuario de GitHub
   */
  async getUser(username: string) {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    console.log('GitHub User Response:', data);
    return data;
  }

  /**
   * Obtiene eventos del usuario de GitHub
   */
  async getUserEvents(username: string) {
    const res = await fetch(`https://api.github.com/users/${username}/events/public`);
    const data = await res.json();
    console.log('GitHub Events Response:', data);
    return data;
  }

  /**
   * Obtiene los lenguajes de programación de los repositorios del usuario
   */
  async getUserLanguages(username: string) {
    const repos = await this.getRepos(username);
    const languages = new Set<string>();
    
    console.log('Repos:', repos);
    
    for (const repo of repos) {
      if (repo.language) {
        languages.add(repo.language);
        console.log('Language found:', repo.language);
      }
    }
    
    const uniqueLanguages = Array.from(languages);
    console.log('GitHub Languages Response:', uniqueLanguages);
    return uniqueLanguages;
  }

  /**
   * Calendario de contribuciones del último año (fecha, count y nivel 0–4).
   * Usa el grafo público de GitHub; los eventos REST solo cubren ~90 días y suelen llegar vacíos.
   */
  async getUserContributions(username: string): Promise<ContributionDay[]> {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
    if (!res.ok) {
      throw new Error(`Error ${res.status}: no se pudo leer el calendario de GitHub`);
    }

    const data = (await res.json()) as {
      contributions?: Array<{ date: string; count: number; level: number }>;
    };
    const days = (data.contributions ?? []).map((day) => ({
      date: day.date,
      count: day.count,
      level: Math.max(0, Math.min(4, day.level)) as ContributionLevel,
    }));

    console.log("GitHub Contributions:", days.filter((day) => day.count > 0));
    return days;
  }
}

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionDay = {
  date: string;
  count: number;
  level: ContributionLevel;
};

// Instancia por defecto
export const apiServices = new ApiServices();

// Exportar la clase para crear instancias personalizadas
export default ApiServices;