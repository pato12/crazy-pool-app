import _ from 'lodash';
import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { View, Dimensions, Platform } from 'react-native';
import { format as formatDate } from 'date-fns';
import type { Theme } from 'react-native-elements';

import type { IWalletStatsData } from '../hooks/useWalletStats';
import useTheme from '../hooks/useTheme';

import { formatHashrate } from '../helpers';

type ChartConfig = React.ComponentProps<typeof LineChart>['chartConfig'];

interface IMinersChartProps {
  minerCharts: IWalletStatsData['minerCharts'];
}

function MinersChart(props: IMinersChartProps) {
  const { theme } = useTheme();

  const chartWidth = Dimensions.get('window').width - 15 * 2;

  const average6hours = props.minerCharts.map(v => v.minerLargeHash);
  const average1hour = props.minerCharts.map(v => v.minerHash);
  const labels = _.at(
    props.minerCharts.map(v => `${v.x}`),
    sampleLabels(props.minerCharts.length, chartWidth / 25),
  );

  const chartConfig: ChartConfig = {
    backgroundColor: theme.colors?.grey3,
    backgroundGradientFrom: theme.colors?.grey2,
    backgroundGradientTo: theme.colors?.grey3,
    color: (opacity = 1) => `rgba(${hexToRgb(theme.colors?.white, opacity)})`,
    labelColor: (opacity = 1) => `rgba(${hexToRgb(theme.colors?.white, opacity)})`,
  };

  return (
    <View style={styles.container(theme)}>
      {chartWidth > 0 && (
        <LineChart
          withDots={false}
          withVerticalLines={false}
          data={{
            labels,
            legend: ['6 hours average', '1 hour average'],
            datasets: [
              {
                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // optional
                data: average6hours,
              },
              {
                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // optional
                data: average1hour,
              },
            ],
          }}
          yLabelsOffset={0}
          xLabelsOffset={0}
          formatXLabel={value => formatDate(+value, 'H:mm')}
          formatYLabel={value => formatHashrate(+value)}
          width={chartWidth}
          height={chartWidth * 0.5}
          chartConfig={chartConfig}
          bezier
        />
      )}
    </View>
  );
}

export default MinersChart;

function hexToRgb(hex: string | undefined, opacity: number) {
  const bigint = parseInt((hex || '0').replace('#', ''), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r},${g},${b},${opacity}`;
}

function sampleLabels(labelsNumber: number, step: number) {
  const steps = _.range(0, labelsNumber, step << 0);

  if (steps[steps.length - 1] !== labelsNumber - 1) {
    steps.pop();
    steps.push(labelsNumber - 1);
  }

  return steps;
}

const styles = {
  container: (theme?: Theme) => ({
    backgroundColor: theme?.colors?.white,
    borderWidth: 1,
    margin: 15,
    marginBottom: 0,
    borderColor: theme?.colors?.grey5,
    ...Platform.select({
      android: {
        elevation: 1,
      },
      default: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
  }),
};
