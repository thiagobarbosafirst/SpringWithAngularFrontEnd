import { Component, OnInit } from '@angular/core';
import { ExtratoService } from './extrato.service';
import { TipoContaEnum } from 'src/app/shared/enums/tipo-conta.enum';
import { TipoTransacaoEnum } from 'src/app/shared/enums/tipo-transacao.enum';
@Component({
    selector: 'app-extrato',
    templateUrl: './extrato.component.html',
    styleUrls: ['./extrato.component.scss'],
    providers: [ExtratoService]
})
export class ExtratoComponent implements OnInit {

    extrato: any = {
        id: null,
        tipoConta: null
    };

    extratos: Array<any>;
    valorTotal: number;

    readonly tipoContaEnum: typeof TipoContaEnum = TipoContaEnum;
    readonly tipoTransacaoEnum: typeof TipoTransacaoEnum = TipoTransacaoEnum;

    constructor(private extratoService: ExtratoService) { }

    ngOnInit() {
    }

    pesquisar(): void {
        this.extratoService.obterExtrato(this.extrato).subscribe((response: any) => {
            this.extratos = response;
            this.obterValorTotalConta();
        });

    }

    obterValorTotalConta(): void {
        this.extratoService.obterValorTotalConta(this.extrato).subscribe((response: any) => {
            this.valorTotal = response;
        });
    }

    imprimir(): void {
        this.imprimirConteudo('Extrato', 'extrato')
    }

    imprimirConteudo(titulo : string, idConteudoAImprimir : string) {

        const style = this.getElemento('style');

        let conteudo = document.getElementById(idConteudoAImprimir).innerHTML;
        let telaImpressao = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');

        telaImpressao.document.open();
        
        telaImpressao.document.write(`
        <html>
            <head>
                <title>${titulo}</title>
                ${style}
            </head>
            <body style="background-color: #fff" onload="window.print();window.close()">${conteudo}</body>
        </html>
        `);
        telaImpressao.document.close();

    }

    private getElemento(htmlElementTagName: keyof HTMLElementTagNameMap): string {
        const html: string[] = [];
        const elementos: HTMLCollection = document.getElementsByTagName(htmlElementTagName);
        const arrayElementos: Array<any> = Array.from(elementos);

        arrayElementos.map((elemento: any) => {
            html.push(elemento.outerHTML);
        });
        return html.join('\r\n');
      }
    
}
