import {Pipe, PipeTransform} from '@angular/core';
import {UserService} from '../../services/user.service';
import {WalletType} from '../local/wallet.enum';

@Pipe({
    name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

    public currnetCurrency;

    constructor(private userService: UserService) {
    }

    transform(value: any, args?: any): any {

        if (args.currency === WalletType.Bitcoin) {
            return (value || 0) + ' BTC';
        }
        if (args.currency === WalletType.Ethereum) {
            return (value || 0) + ' ETH';
        }
        if (args.currency === WalletType.Litecoin) {
            return (value || 0) + ' LTC';
        }
        if (args.currency === WalletType.Monero) {
            return (value || 0) + ' XMR';
        }
        if (args.currency === WalletType.BitcoinCash) {
            return (value || 0) + ' BCH';
        }

        return value;
    }

}
