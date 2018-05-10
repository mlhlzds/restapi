import { Component, OnInit, Input } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tree-component',
  templateUrl: './tree-component.component.html',
  styleUrls: ['./tree-component.component.css']
})
export class TreeComponentComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }

  // 超简单, 重点: 接收上级的值
  // 可以为树建立一个接口, 这里简化为any
  @Input() treelists: any

  // // 点击动作
  itemClick(menu_url) {
    this.router.navigateByUrl(menu_url);
  }
}
