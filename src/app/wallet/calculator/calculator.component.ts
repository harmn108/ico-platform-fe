import {Component, isDevMode, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ConfigService} from '../../services/config.service';
import {ApiService} from '../../services/api.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit, OnDestroy {

  public currencyMap: Map<string, number>;
  public currencies = [];
  public bonusData;
  public calculatedBonus: number;
  public calculatedToken: any;
  public calculatorForm: FormGroup;
  public selectedCurrency = '';
  public icoInfoSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private configService: ConfigService,
              private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getRates().subscribe(rates => {
      if (rates) {
        this.currencies = Object.keys(rates);
        this.selectedCurrency = this.currencies[0];
        this.currencyMap = new Map();
        for (const k of this.currencies) {
          this.currencyMap.set(k, rates[k]);
        }

        this.bonusData = {};

        if (this.configService.icoStage === this.configService.STAGE_PREICO) {
          this.configService.getIcoInfo();
          this.icoInfoSubscription = this.configService.icoInfo.subscribe(config => {
            this.bonusData.bonus = config.pre_ico_bonus;
            this.bonusData.daysLeft = this.days_until(config.ico_start_date);
          });

        } else {
          this.configService.currentBonus().subscribe(config => {
            this.bonusData = config;
            this.bonusData.daysLeft = this.days_until(this.bonusData.dateTo);
          }, err => console.error(err));
        }

        this.buildForm();
        this.calculatorForm.valueChanges.subscribe(data => {
          this.calculate(data);
          this.selectedCurrency = data.currency;
        });
      }
    });
  }

  buildForm() {
    this.calculatorForm = this.formBuilder.group({
      'value': new FormControl(),
      'currency': new FormControl(this.selectedCurrency)
    });
  }

  validate(event: any) {
    const input = event.key;
    if (!(/[0-9.]/.test(input)) && event.charCode !== 0) {
      if (isDevMode()) {
        console.log(input, 'is not a number');
      }
      event.preventDefault();
    }
  }

  calculate(data: any) {
    if (this.currencyMap && this.currencyMap.has(data.currency)) {
      const calculatedNumber = parseFloat(data.value) / this.currencyMap.get(data.currency);
      this.calculatedToken = parseFloat(calculatedNumber.toFixed(6));

      if (this.bonusData.bonus) {
        const bonus = calculatedNumber * this.bonusData.bonus / 100;
        this.calculatedBonus = parseFloat(bonus.toFixed(6));
      }
    }
  }

  days_until(targetDate) {

    let expire = Math.floor((targetDate - this.configService.icoInfo.value['current_timestamp']));
    const expirationDays = Math.floor(expire / 86400);
    expire -= expirationDays * 86400;
    const expirationHours = Math.floor(expire / 3600) % 24;

    return {
      expirationHours: expirationHours,
      expirationDays: expirationDays
    };
  }

  ngOnDestroy() {
    this.icoInfoSubscription.unsubscribe();
  }

}
