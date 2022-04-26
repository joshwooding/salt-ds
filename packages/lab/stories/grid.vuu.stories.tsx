// @ts-ignore
import { RemoteDataSource, Servers, useViewserver } from "@vuu-ui/data-remote";
import {
  ColumnDefinition,
  createHandler,
  createHook,
  createNumericColumn,
  createTextColumn,
  Grid,
} from "@brandname/lab";
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  throttleTime,
} from "rxjs";

export default {
  title: "Lab/Grid/Vuu Data",
  component: Grid,
};

const vuuTableMeta = {
  instruments: {
    columns: [
      "bbg",
      "currency",
      "description",
      "exchange",
      "isin",
      "lotSize",
      "ric",
    ],
    dataTypes: [
      "string",
      "string",
      "string",
      "string",
      "string",
      "int",
      "string",
    ],
    key: "ric",
  },
};

type RowData = {
  key: string;
  test: string;
  bbg: string;
  currency: string;
  description: string;
  exchange: string;
  isin: string;
  lotSize: number;
  ric: string;
};

const getKey = (record: RowData | undefined, index: number) =>
  record ? record.key : String(index);

const columnDefinitions: ColumnDefinition<RowData>[] = [
  createTextColumn("test", "Test", "test", 80, "left"),
  createTextColumn("bbg", "BBG", "bbg", 100),
  createTextColumn("currency", "Currency", "currency", 100),
  createTextColumn("description", "Description", "description", 200),
  createTextColumn("exchange", "Exchange", "exchange", 100),
  createTextColumn("isin", "ISIN", "isin", 100),
  createNumericColumn("lotSize", "Lot Size", "lotSize", 100),
  createTextColumn("ric", "RIC", "ric", 100),
];

class VuuGridModel {
  public readonly data$ = new BehaviorSubject<RowData[]>([]);
  public readonly dataLength$ = new BehaviorSubject<number>(0);
  public readonly visibleRange$ = new BehaviorSubject<[number, number]>([
    0, 30,
  ]);
  public readonly subscribedRange$ = new BehaviorSubject<[number, number]>([
    0, 0,
  ]);

  public dataSource: RemoteDataSource;
  public setRange: (range: [number, number]) => void;
  public useData: () => RowData[];

  constructor() {
    const { columns, dataTypes } = vuuTableMeta.instruments;
    const dataConfig = {
      bufferSize: 100,
      columns,
      serverName: Servers.Vuu,
      tableName: { table: "instruments", module: "SIMUL" },
      serverUrl: "127.0.0.1:8090/websocket",
    };
    this.dataSource = new RemoteDataSource(dataConfig);
    this.setRange = createHandler(this.visibleRange$);
    this.useData = createHook(this.data$);

    this.data$
      .pipe(
        map((data) => data.length),
        distinctUntilChanged()
      )
      .subscribe(this.dataLength$);

    combineLatest([this.visibleRange$, this.dataLength$]).subscribe(
      ([visibleRange, dataLength]) => {
        this.subscribedRange$.next([
          visibleRange[0],
          Math.min(visibleRange[1], dataLength),
        ]);
      }
    );

    this.subscribedRange$.pipe(debounceTime(20)).subscribe((range) => {
      const [start, end] = range;
      console.log(`subscribedRange$: [${start}, ${end}]`);
      this.dataSource.setRange(start, end);
    });
  }

  private viewportUpdateHandler = (size: number | undefined, rows: any[][]) => {
    const oldData = this.data$.getValue();
    const range = this.subscribedRange$.getValue();
    let newData: RowData[] = [];

    if (size !== undefined) {
      console.log(`data length updated to ${size}`);
      newData.length = size;
    } else {
      newData.length = oldData.length;
    }

    for (let i = range[0]; i < range[1]; ++i) {
      newData[i] = oldData[i];
    }

    if (rows !== undefined) {
      console.log(`rows updated ${rows.length}`);
      for (let row of rows) {
        const index = row[0] as number;
        const key = row[6];

        const bbg = row[8];
        const currency = row[9];
        const description = row[10];
        const exchange = row[11];
        const isin = row[12];
        const lotSize = row[13] as number;
        const ric = row[14];
        newData[index] = {
          key,
          test: `R${index}`,
          bbg,
          currency,
          description,
          exchange,
          isin,
          lotSize,
          ric,
        };
      }
    }
    this.data$.next(newData);
  };

  private dataSourceMessageHandler = (message: any) => {
    const { type, ...msg } = message;
    console.log(`message from viewport ${type}`);
    switch (type) {
      case "subscribed":
        console.log(`Subscribed to Vuu`);
        break;
      case "VIEW_PORT_MENUS_RESP":
        console.log(`Received viewport menus`);
        break;
      case "viewport-update":
        console.log(`Received viewport update`);
        this.viewportUpdateHandler(msg.size, msg.rows);
        break;
    }
  };

  public subscribe() {
    const subscribedRange = this.subscribedRange$.getValue();
    this.dataSource.subscribe(
      {
        range: { lo: subscribedRange[0], hi: subscribedRange[1] },
      },
      this.dataSourceMessageHandler
    );
  }
}

const model = new VuuGridModel();
model.subscribe();

export const DefaultGridWithVuuData = () => {
  const data = model.useData();

  const onVisibleRowRangeChanged = (range: [number, number]) => {
    model.setRange(range);
  };

  return (
    <Grid
      data={data}
      columnDefinitions={columnDefinitions}
      rowSelectionMode={"single"}
      showCheckboxes={true}
      getKey={getKey}
      isZebra={true}
      onVisibleRowRangeChanged={onVisibleRowRangeChanged}
    />
  );
};