import { API_BASE_URL } from "@/services/config/routes";
import HTTPTransport from "@/services/http/HTTPTrasport";

export default abstract class BaseAPI {
  protected readonly http: HTTPTransport;

  constructor(endpoint: string) {
    this.http = new HTTPTransport(`${API_BASE_URL}${endpoint}`);
  }
}
