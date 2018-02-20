import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';
import {Subscription} from 'rxjs/Subscription';
import {ContentService} from '../../services/content.service';
import {LanguageService} from '../../services/lenguage.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges, OnDestroy {

  @Input() chart;
  @Input() data;
  @ViewChild(BaseChartDirective) private _chart;
  doughnutChartLabels: string[] = [];
  doughnutChartData: number[] = [];
  doughnutChartType = 'doughnut';
  doughnutChartOption: object = {
    tooltips: {
      mode: 'single',
      callbacks: {
        label: function (tooltipItems, data) {
          return data.labels[tooltipItems.index] + ': '
            + data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index] + ' %';
        }
      }
    },
    legend: {
      position: 'bottom',
      onClick: null,
      labels: {
        usePointStyle: false,
        margin: 10
      }
    }
  };

  doughnutChartColors: Array<object> = [{backgroundColor: ['#3366FF', '#5982FF', '#7899FE', '#9DB4F9', '#CDD9FF']}];
  public languageSub: Subscription;

  constructor(private contentService: ContentService,
              private languageService: LanguageService) {
  }

  ngOnChanges(changes: SimpleChanges) {

    if (this.data) {
      this.doughnutChartData = [];
      this.doughnutChartLabels = [];
      for (const item of this.data) {
        this.doughnutChartLabels.push(item.title);
        this.doughnutChartData.push(item.percent);
      }
      this.chartRefresh();
    } else {
      this.languageSub = this.languageService.language.subscribe(lang => {
        this.contentService.getTokenAllocation(lang).subscribe(
          data => {

            if (data) {
              this.doughnutChartData = [];
              this.doughnutChartLabels = [];
              for (const item of data) {
                this.doughnutChartLabels.push(item.title);
                this.doughnutChartData.push(item.percent);
              }
              this.chartRefresh();
            }
          },
        );
      });
    }
  }

  chartRefresh() {
    if (this._chart) {
      setTimeout(() => {
        this._chart.refresh();
      }, 10);
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.languageSub) {
      this.languageSub.unsubscribe();
    }
  }

}
