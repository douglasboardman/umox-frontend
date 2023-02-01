import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WebRequestService {
  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://192.168.10.100:3000';
  }

  get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  post(uri: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  patch(uri: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }

  login(email: string, senha: string) {
    return this.http.post(
      `${this.ROOT_URL}/login`,
      { email, senha },
      { observe: 'response' }
    );
  }

  register(nome: string, email: string, senha: string) {
    return this.http.post(
      `${this.ROOT_URL}/register`,
      { nome, email, senha },
      { observe: 'response' }
    );
  }
}
