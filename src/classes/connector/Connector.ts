export class Connector {
  private xhr: XMLHttpRequest;

  constructor() {
    this.xhr = new XMLHttpRequest();
  }

  private sendRequest(url: string, method: string, data: any = null): Promise<any> {
    return new Promise((resolve, reject) => {
      this.xhr.open(method, url);

      this.xhr.onload = () => {
        if (this.xhr.status >= 200 && this.xhr.status < 300) {
          resolve(JSON.parse(this.xhr.response));
        } else {
          reject(this.xhr.statusText);
        }
      };

      this.xhr.onerror = () => {
        reject(new Error('An error occurred during the XMLHttpRequest'));
      };

      if (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT') {
        this.xhr.setRequestHeader('Content-Type', 'application/json');
      }

      this.xhr.send(JSON.stringify(data));
    });
  }

  public get(url: string, data?: Record<string, any>): Promise<any> {
    if (data) {
      // eslint-disable-next-line no-param-reassign
      url += `?${Object.entries(data)
        .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`).join('&')}`;
    }

    return this.sendRequest(url, 'GET');
  }

  public post(url: string, data: any): Promise<any> {
    return this.sendRequest(url, 'POST', data);
  }

  public put(url: string, data: any): Promise<any> {
    return this.sendRequest(url, 'PUT', data);
  }

  public delete(url: string): Promise<any> {
    return this.sendRequest(url, 'DELETE');
  }
}
