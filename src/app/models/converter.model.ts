export class Converter {
    id: number;
    from: string;
    to: string;
    fromCurrencyFullName: string;
    toCurrencyFullName: string;
    amount: number;
    result: number;
    rate: number;
    timestamp: number;
}

export interface IConverterSymbol {
    label: any;
    name: string;
    icon: string
}