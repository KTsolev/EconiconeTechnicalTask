export class TodoModel {
  constructor(
    public id: string,
    public title: string,
    public completed: boolean = false,
    public isNew: boolean = false,
  ) {}
}
