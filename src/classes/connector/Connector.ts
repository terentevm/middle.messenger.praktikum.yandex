export const BaseURL = 'https://ya-praktikum.tech/api/v2';
export const FileURL = 'https://ya-praktikum.tech/api/v2/resources';
export class Connector {
  private xhr: XMLHttpRequest;
  private static _instance: Connector;
  constructor() {

    if (Connector._instance) {
      return Connector._instance;
    }
    this.xhr = new XMLHttpRequest();

    Connector._instance = this;
  }

  private sendRequest(url: string, method: string, data: any = null, headers:{[key: string] : string} = {}): Promise<any> {
    return new Promise((resolve, reject) => {

      this.xhr.open(method, `${BaseURL}${url}`);

      this.xhr.onload = () => {
        if (this.xhr.status >= 200 && this.xhr.status < 300) {
           const contentType = this.xhr.getResponseHeader("Content-Type") || '';

          if (contentType.toLowerCase().indexOf('application/json') !== -1) {
            resolve(JSON.parse(this.xhr.response));
          } else {
            resolve(this.xhr.response);
          }

        } else {
          reject(this.xhr.statusText);
        }
      };

      this.xhr.onerror = () => {
        reject(new Error('An error occurred during the XMLHttpRequest'));
      };

      const contentType = headers['Content-Type'] ? headers['Content-Type'] : 'application/json';
      if (!(data instanceof FormData)) {
        if (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT' || method.toUpperCase() === 'DELETE' && contentType === 'application/json') {
          this.xhr.setRequestHeader('Content-Type', contentType);
        }
      }


      this.xhr.withCredentials = true;

      if (method === 'get' && !data) {
        this.xhr.send();
      } else {
        if (data) {
          this.xhr.send(this.getRequestBody(data, contentType));
        } else {
          this.xhr.send();
        }

      }


    });
  }

  private getRequestBody(data: any, contentType: string = 'application/json') {
    if (data instanceof FormData) {
      return data;
    }
    switch (contentType) {
      case 'multipart/form-data':
        return data;
        break;
      default:
        return JSON.stringify(data)
    }
  }

  public get(url: string, data?: Record<string, any>): Promise<any> {
    if (data) {
      // eslint-disable-next-line no-param-reassign
      url += `?${Object.entries(data)
        .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`).join('&')}`;
    }

    return this.sendRequest(url, 'GET');
  }

  public post(url: string, data?:any): Promise<any> {
    console.log(`post to ${url}`);
    return this.sendRequest(url, 'POST', data);
  }

  public put(url: string, data: any): Promise<any> {
    return this.sendRequest(url, 'PUT', data);
  }

  public delete(url: string, data?: any): Promise<any> {
    return this.sendRequest(url, 'DELETE', data);
  }

  public sendFile(url: string, method: string, form: FormData) {
    return this.sendRequest(url, method, form)
  }
}
