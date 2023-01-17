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

export class PanelMenuPair {
  public _left!: PanelMenu;
  public _right!: PanelMenu;

  public get left(): PanelMenu {
    return this._left;
  }

  public get right(): PanelMenu {
    return this._right;
  }


  public set left(left: PanelMenu) {
    this._left = left;
  }

  public set right(right: PanelMenu) {
    this._right = right;
  }
}
