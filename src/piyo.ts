export interface Piyo {
  handle(name: string): string;
}

export class MyPiyo implements Piyo {
  public handle(name: string): string {
    return `${name} piyopiyo`;
  }
}
