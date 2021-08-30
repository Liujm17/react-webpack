import React from "react";
import { monthDays } from "../../../utils/mixins";
import "./home.scss";

class DatePage extends React.Component {
  onSelect(val) {
    this.props.onSelect(val);
  }
  render() {
    return (
      <div className="content">
        {this.props.time.map((item, index) => {
          return (
            <table className="date-table" key={index}>
              <thead>
                <tr>
                  <td colSpan="7">
                    <h5>
                      {item.year}年{item.month}月
                    </h5>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr className="data-table-weeks">
                  <th>周一</th>
                  <th>周二</th>
                  <th>周三</th>
                  <th>周四</th>
                  <th>周五</th>
                  <th className="weekend">周六</th>
                  <th className="weekend">周日</th>
                </tr>
                {monthDays(`${item.year}-${item.month}`).map(
                  (item2, index2) => {
                    return (
                      <tr className="data-table-days" key={index2}>
                        {item2.map((childItem2, childIndex2) => {
                          if (childItem2) {
                            if (new Date().getTime() - childItem2 > 86400000) {
                              //禁用选项不需要点击事件
                              return (
                                <td className="disabled" key={childIndex2}>
                                  {new Date(childItem2).getDate()}
                                </td>
                              );
                            } else if (
                              new Date().getTime() - childItem2 >= 0 &&
                              new Date().getTime() - childItem2 < 86400000
                            ) {
                              return (
                                <td
                                  key={childIndex2}
                                  onClick={this.onSelect.bind(this, childItem2)}
                                >
                                  今天
                                </td>
                              );
                            } else {
                              return (
                                <td
                                  key={childIndex2}
                                  onClick={this.onSelect.bind(this, childItem2)}
                                >
                                  {new Date(childItem2).getDate()}
                                </td>
                              );
                            }
                          } else {
                            return <td key={childIndex2} className="null"></td>;
                          }
                        })}
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          );
        })}
      </div>
    );
  }
}

export default DatePage;
