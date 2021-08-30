import React from "react";
import { Table, Tag, } from "antd";

class Tbale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "姓名",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "年龄",
          dataIndex: "age",
          key: "age",
        },
        {
          title: "地址",
          dataIndex: "address",
          key: "address",
        },
        {
          title: "标签",
          key: "tags",
          dataIndex: "tags",
          render: (tags) => (
            <>
              {tags.map((tag) => {
                let color = tag.length > 5 ? "geekblue" : "green";
                if (tag === "loser") {
                  color = "volcano";
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        },
        {
          title: "操作",
          key: "action",
          render: (text, record) => (
              <>
              <span>Invite {record.name}</span>
              <span>Delete</span>
              </>
          ),
        },
      ],
      data: [
        {
          key: "1",
          name: "John Brown",
          age: 32,
          address: "New York No. 1 Lake Park",
          tags: ["nice", "developer"],
        },
        {
          key: "2",
          name: "Jim Green",
          age: 42,
          address: "London No. 1 Lake Park",
          tags: ["loser"],
        },
        {
          key: "3",
          name: "Joe Black",
          age: 32,
          address: "Sidney No. 1 Lake Park",
          tags: ["cool", "teacher"],
        },
      ],
    };
  }
  render() {
    return <Table columns={this.state.columns}  pagination={{ position: ['bottomRight'],pageSize:2,total:3,onChange:(page)=>console.log(page)}}  dataSource={this.state.data} />;
  }
}

export default Tbale;
