import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import axios from 'axios';
import { Table } from 'antd';
import moment from 'moment';

const limit = 20;
 
@connect(
  state =>({
    curdata: state.inter.curdata
  })
)
class InterfaceStatis extends React.Component{
  static propTypes = {
    curdata: PropTypes.object
  };

  state = {
    list: [],
    count: 0,
    total: 0,
    current: 1
  }

  async getStatisData() {
    const {current} = this.state;
    const _id = this.props.curdata._id;
    let result = await axios.get(`/api/plugin/interfaceStatisList?page=${current}&limit=${limit}&interface_id=${_id}`);
    if (result.data.errcode === 0) {
      const {list, count, total} = result.data.data;
      this.setState({
        list,
        count,
        total
      });
    }
  }

  handleChange = (pagination) => {
    this.setState({
      current: pagination.current || 1
    }, () => this.getStatisData(this.state));
  };
  
  componentDidMount() {
    this.getStatisData();
  }
  

  render(){
    const {curdata} = this.props;
    const { list, count } = this.state;
    const pageConfig = {
      total: count,
      pageSize: limit,
      current: this.state.current
    };

    const columns = [
      {
        title: 'id',
        dataIndex: '_id',
        key: '_id',
        width: 30
      },
      {
        title: '访问ip',
        dataIndex: 'ip',
        key: 'ip',
        width: 30
      },
      // {
      //   title: 'query参数',
      //   dataIndex: 'query',
      //   key: 'query',
      //   width: 200
      // },
      {
        title: '访问时间',
        dataIndex: 'time',
        key: 'time',
        width: 50,
        render: (item, record) => {
          return (
            <span>
              {moment(record.time*1000).format('LTS')}
            </span>
          );
        }
      },
      {
        title: '日期',
        dataIndex: 'date',
        key: 'date',
        width: 100,
        render: (item, record) => {
          return (
            <span>
              {record.date}
            </span>
          );
        }
      }
    ];

    return (
      <div style={{ padding: '24px' }}>
        <div>
          <h2 className="interface-title" style={{ display: 'inline-block', margin: 0 }}>
            接口名称：
            {curdata.title},
            总访问次数: 
            <span>{count}</span>
          </h2>
        </div>
        <Table
          rowKey="_id"
          className="table-interfacelist"
          pagination={pageConfig}
          columns={columns}
          dataSource={list}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}


export default InterfaceStatis;

