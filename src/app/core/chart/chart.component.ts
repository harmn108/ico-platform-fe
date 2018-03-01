import {
  Component, Inject, Input, OnChanges, OnDestroy, OnInit, PLATFORM_ID, SimpleChanges,
  ViewChild
} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';
import {Subscription} from 'rxjs/Subscription';
import {ContentService} from '../../services/content.service';
import {LanguageService} from '../../services/lenguage.service';
import {isPlatformBrowser} from '@angular/common';

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
  public allocationsSub: Subscription;

  constructor(private contentService: ContentService,
              private languageService: LanguageService,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnChanges(changes: SimpleChanges) {

    if (isPlatformBrowser(this.platformId)) {
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
            this.allocationsSub = this.contentService.getTokenAllocation(lang).subscribe(
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
              err => console.error(err));
          },
          err => console.error(err));
      }
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
    this.allocationsSub.unsubscribe();
  }

}
