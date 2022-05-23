import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { MenuListComponent } from './menu-list.component';
import { MenuItemAttributesDirective } from '../../directives/item-attributes/menu-item-attributes.directive';
import { MenuAnimationParamsPipe } from '../../pipes/menu-animation-params/menu-animation-params.pipe';

describe('MenuListComponent', () => {
  let component: MenuListComponent;
  let fixture: ComponentFixture<MenuListComponent>;
  let debugElement: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuListComponent,
        MenuItemAttributesDirective,
        MenuAnimationParamsPipe,
      ],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  describe('General', () => {
    beforeEach(() => {
      component.items = [
        { label: 'Menu item 1' },
      ];

      fixture.detectChanges();
    });

    it('should create MenuListComponent component', () => {
      expect(component).toBeTruthy();
    });

    it('should display accordion item label', () => {
      const $menuLabel = debugElement.query(By.css('.menu__link-label'));

      expect($menuLabel.nativeElement.textContent).toEqual('Menu item 1')
    });

    it('should show item icon status element if showStatusIcon, toggleable is true and subItems not empty', () => {
      component.items[0].showStatusIcon = true;
      component.items[0].children = [
        { label: 'Sub item 1' },
      ];

      fixture.detectChanges();

      const $menuStatus: DebugElement = debugElement.query(By.css('.menu__item-status'));

      expect($menuStatus).toBeTruthy();
    });

    it('should hide item icon status element if showStatusIcon, toggleable false or subItems empty', () => {
      let $menuStatus: DebugElement;

      // with showStatusIcon
      component.items[0].showStatusIcon = true;

      fixture.detectChanges();

      $menuStatus = debugElement.query(By.css('.menu__item-status'));

      expect($menuStatus).toBeNull();

      fixture.detectChanges();

      $menuStatus = debugElement.query(By.css('.menu__item-status'));

      expect($menuStatus).toBeNull();

      // with sub items
      component.items[0].children = [
        { label: 'Sub item 1' },
      ];

      fixture.detectChanges();

      $menuStatus = debugElement.query(By.css('.menu__item-status'));

      expect($menuStatus).toBeNull();
    });

    it('should show showStatusIcon, clickable label, clickable icon if toggleArea is both or undefined', () => {
      component.items[0].toggleArea = 'both';
      component.items[0].showStatusIcon = true;
      component.items[0].children = [
        { label: 'Sub item 1' },
      ];
      fixture.detectChanges();

      debugElement.query(By.css('.menu__link-arrow')).nativeElement.click();

      expect(component.items[0].open).toBeTrue();

      component.items[0].open = false;

      debugElement.query(By.css('.menu__link')).nativeElement.click();

      expect(component.items[0].open).toBeTrue();
    });

    it('should show showStatusIcon, clickable label, non clickable icon if toggleArea is label', () => {
      component.items[0].toggleArea = 'label';
      component.items[0].showStatusIcon = true;
      component.items[0].children = [
        { label: 'Sub item 1' },
      ];

      fixture.detectChanges();

      debugElement.query(By.css('.menu__link-arrow')).nativeElement.click();

      expect(component.items[0].open).toBeFalsy();

      debugElement.query(By.css('.menu__link')).nativeElement.click();

      expect(component.items[0].open).toBeTrue();
    });

    it('should show showStatusIcon, non clickable label, clickable icon if toggleArea is icon', () => {
      component.items[0].toggleArea = 'icon';
      component.items[0].showStatusIcon = true;
      component.items[0].children = [
        { label: 'Sub item 1' },
      ];

      fixture.detectChanges();

      debugElement.query(By.css('.menu__link')).nativeElement.click();

      expect(component.items[0].open).toBeFalsy();

      debugElement.query(By.css('.menu__link-arrow')).nativeElement.click();

      expect(component.items[0].open).toBeTrue();
    });

    it(`shouldn't show sub menu if accordion item hasn't children items`, () => {
      expect(debugElement.query(By.css('.menu__item--index-0 .menu--level-1'))).toBeNull();
    });

    it('should show sub menu if accordion item has children items', () => {
      component.items[0].children = [
        { label: 'Sub menu item 1' },
      ];

      fixture.detectChanges();

      expect(debugElement.query(By.css('.menu__item--index-0 .menu--level-1'))).toBeTruthy();
    });

    it(`shouldn't show sub menu on click item label if expanded is falsy`, () => {
      component.items[0].children = [
        { label: 'Sub menu item 1' },
      ];

      fixture.detectChanges();

      const $subMenu = debugElement.query(By.css('.menu__item--index-0 .menu__sub-menu')).nativeElement;

      expect(getComputedStyle($subMenu).height).toEqual('0px');
    });

    it(`should show sub menu on click item label if expanded is true and click on menu item`, () => {
      component.items[0].children = [
        { label: 'Sub menu item 1' },
      ];

      debugElement.query(By.css('.menu__item--index-0 .menu__link')).nativeElement.click();

      fixture.detectChanges();

      const $subMenu = debugElement.query(By.css('.menu__item--index-0 .menu__sub-menu')).nativeElement;

      expect(getComputedStyle($subMenu).height).toBe('18px');
      expect(component.items[0].open).toBeTrue();
    });

    it(`should open active tab and don't close another tabs if multiple prop is true`, () => {
      component.items = [
        {
          label: 'Menu item 1',
          children: [
            { label: 'Sub menu item 1.1' }
          ],
        },
        {
          label: 'Menu item 2',
          children: [
            { label: 'Sub menu item 2.1' }
          ],
        },
        {
          label: 'Menu item 3',
          children: [
            { label: 'Sub menu item 3.1' }
          ],
        },
      ];

      fixture.detectChanges();

      debugElement.query(By.css('.menu__item--index-0 .menu__link')).nativeElement.click();
      debugElement.query(By.css('.menu__item--index-1 .menu__link')).nativeElement.click();
      debugElement.query(By.css('.menu__item--index-2 .menu__link')).nativeElement.click();

      console.log(component.items);
      console.log(component.items[0].open);


      // fixture.detectChanges();

      console.log(debugElement.query(By.css('.menu__item--index-1 .menu__sub-menu')).nativeElement.style.height);

      const $subMenu = debugElement.query(By.css('.menu__item--index-0 .menu__sub-menu')).nativeElement;

      console.log($subMenu);
    });

    it('should open active tab and close another tabs if multiple prop is false', () => {

    });
  });

  // describe('Item with url', () => {
  //   beforeEach(() => {
  //     component.items = [
  //       {
  //         label: 'Menu item 1',
  //         action: {
  //           url: 'some-url',
  //         },
  //       },
  //     ];
  //   });
  //   it('should render item with tag a', () => {
  //     const $accordionItem = debugElement.query(By.css('a.menu__link')).nativeElement;
  //
  //     expect($accordionItem).toBeTruthy();
  //   });
  //
  //   it('should render accordion item with expected url', () => {
  //     const $accordionItem = debugElement.query(By.css('a.menu__link')).nativeElement;
  //
  //     expect($accordionItem.getAttribute('href')).toEqual('some-url');
  //   });
  //
  //   it('should add disabled class if input property disabled true', () => {
  //     component.items[0].disabled = true;
  //
  //     fixture.detectChanges();
  //
  //     const $li = debugElement.query(By.css(getLinks(0, 'disabled').item));
  //     const $link = debugElement.query(By.css(getLinks(0, 'disabled').link));
  //
  //     expect($li).toBeTruthy();
  //     expect($link).toBeTruthy();
  //   });
  //
  //   it(`shouldn't add disabled class if input property disabled false`, () => {
  //     component.items[0].disabled = false;
  //
  //     fixture.detectChanges();
  //
  //     const $li = debugElement.query(By.css(getLinks(0, 'disabled').item));
  //     const $link = debugElement.query(By.css(getLinks(0, 'disabled').link));
  //
  //     expect($li).toBeNull();
  //     expect($link).toBeNull();
  //   });
  //
  //   it(`should add 'expanded' class and hide 'collapsed' class if the item is expanded`, () => {
  //     // component.items[0].expanded = true;
  //     //
  //     // fixture.detectChanges();
  //     //
  //     // const $liExpanded = debugElement.query(By.css(getLinks(0, 'expanded').item));
  //     // const $linkExpanded = debugElement.query(By.css(getLinks(0, 'expanded').link));
  //     //
  //     // const $liCollapsed = debugElement.query(By.css(getLinks(0, 'collapsed').item));
  //     // const $linkCollapsed = debugElement.query(By.css(getLinks(0, 'collapsed').link));
  //     //
  //     // expect($liExpanded).toBeTruthy();
  //     // expect($linkExpanded).toBeTruthy();
  //     //
  //     // expect($liCollapsed).toBeNull();
  //     // expect($linkCollapsed).toBeNull();
  //   });
  //
  //   it(`shouldn't add 'collapsed' class and hide 'expanded' class if the item is expanded`, () => {
  //     component.items[0].expanded = false;
  //
  //     fixture.detectChanges();
  //
  //     const $liExpanded = debugElement.query(By.css(getLinks(0, 'expanded').item));
  //     const $linkExpanded = debugElement.query(By.css(getLinks(0, 'expanded').link));
  //
  //     const $liCollapsed = debugElement.query(By.css(getLinks(0, 'collapsed').item));
  //     const $linkCollapsed = debugElement.query(By.css(getLinks(0, 'collapsed').link));
  //
  //     expect($liCollapsed).toBeTruthy();
  //     expect($linkCollapsed).toBeTruthy();
  //
  //     expect($liExpanded).toBeNull();
  //     expect($linkExpanded).toBeNull();
  //   });
  //
  //   it(`should add 'toggleable' class if input property toggleable true`, () => {
  //     component.items[0].toggleable = true;
  //
  //     fixture.detectChanges();
  //
  //     const $li = debugElement.query(By.css(getLinks(0, 'toggleable').item));
  //     const $link = debugElement.query(By.css(getLinks(0, 'toggleable').link));
  //
  //     expect($li).toBeTruthy();
  //     expect($link).toBeTruthy();
  //   });
  //
  //   it(`shouldn't add 'toggleable' class if input property toggleable false`, () => {
  //     // component.items[0].toggleable = false;
  //     //
  //     // fixture.detectChanges();
  //     //
  //     // const $li = debugElement.query(By.css(getLinks(0, 'toggleable').item));
  //     // const $link = debugElement.query(By.css(getLinks(0, 'toggleable').link));
  //     //
  //     // console.log('li', $li);
  //     // console.log('link', $link);
  //     // console.log(getLinks(0, 'toggleable'));
  //     //
  //     // expect($li).toBeNull();
  //     // expect($link).toBeNull();
  //   });
  //
  //   it(`should contain link type class`, () => {
  //     // const $li = debugElement.query(By.css(getLinks(0, 'link').item));
  //     // const $link = debugElement.query(By.css(getLinks(0, 'a').link));
  //     // const $liCommand = debugElement.query(By.css(getLinks(0, 'command').item));
  //     // const $linkCommand = debugElement.query(By.css(getLinks(0, 'button').link));
  //     // const $liRouter = debugElement.query(By.css(getLinks(0, 'router').item));
  //     // const $linkRouter = debugElement.query(By.css(getLinks(0, 'router').link));
  //     // const $liLabel = debugElement.query(By.css(getLinks(0, 'has-children').item));
  //     // const $linkLabel = debugElement.query(By.css(getLinks(0, 'label').link));
  //     //
  //     // expect($li).toBeTruthy();
  //     // expect($link).toBeTruthy();
  //     //
  //     // expect($liCommand).toBeNull();
  //     // expect($linkCommand).toBeNull();
  //     //
  //     // expect($liRouter).toBeNull();
  //     // expect($linkRouter).toBeNull();
  //     //
  //     // expect($liLabel).toBeNull();
  //     // expect($linkLabel).toBeNull();
  //   });
  // });
});
