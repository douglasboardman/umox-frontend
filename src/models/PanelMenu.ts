export class PanelMenu {
  public _menuTitle: string;
  public _menuDescription: string;
  public _iconClass: string;

  constructor(menuTitle: string, menuDescription: string, iconClass: string) {
    this._menuTitle = menuTitle;
    this._menuDescription = menuDescription;
    this._iconClass = iconClass;
  }

  public get menuTitle(): string {
    return this._menuTitle;
  }

  public set menuTitle(menuTitle: string) {
    this._menuTitle = menuTitle;
  }

  public get menuDescription(): string {
    return this._menuDescription;
  }

  public set menuDescription(menuDescription: string) {
    this._menuDescription = menuDescription;
  }

  public get iconClass(): string {
    return this._iconClass;
  }

  public set iconClass(iconClass: string) {
    this._iconClass = iconClass;
  }
  
}
