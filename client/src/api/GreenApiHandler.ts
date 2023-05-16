class GreenApi {
  static readonly host: string = "https://api.green-api.com";

  static get<T>(url: string): Promise<T> {
    return fetch(this.host + url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json<T>()
      })
  }

  static post<T>(url: string, body: object = {}): Promise<T> {
    return fetch(this.host + url, {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json<T>()
      })
  }

  static delete<T>(url: string): Promise<T> {
    return fetch(this.host + url, {
      method: "DELETE"
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json<T>()
      })
  }
}

export default GreenApi