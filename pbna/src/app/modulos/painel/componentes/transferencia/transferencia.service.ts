import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TransferenciaService {

    private URL = environment.urlBackEnd;

    constructor(private http: HttpClient) { }

    incluir(transferencia: any): Observable<any> {
        return this.http.post(this.URL + 'transferencia/', transferencia);
    }

}
