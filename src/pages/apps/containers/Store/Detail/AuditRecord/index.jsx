/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react'
import { observer, inject } from 'mobx-react'

import Base from 'core/containers/Base/List'
import VersionStatus from 'apps/components/VersionStatus'

import AuditStore from 'stores/openpitrix/audit'
import { getLocalTime } from 'utils'

import styles from './index.scss'

@inject('rootStore')
@observer
export default class AuditRecord extends Base {
  init() {
    this.store = new AuditStore()
  }

  getData(params) {
    const { appId } = this.props.match.params
    this.store.fetchList({ app_id: appId, ...params })
  }

  getTableProps() {
    return {
      ...Base.prototype.getTableProps.call(this),
      selectActions: [],
    }
  }

  getColumns = () => [
    {
      title: t('Time'),
      dataIndex: 'status_time',
      width: '20%',
      render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      isHideable: true,
      width: '15%',
      render: status => <VersionStatus type={status} name={status} />,
    },
    {
      title: t('Version'),
      dataIndex: 'version_name',
      isHideable: true,
      width: '15%',
    },
    {
      title: t('Application Number / Rejection Reason'),
      dataIndex: 'review_id',
      isHideable: true,
      width: '40%',
      render: (reviewId, item) => item.message || reviewId || '-',
    },
    {
      title: t('Operator'),
      dataIndex: 'operator',
      isHideable: true,
      width: '10%',
    },
  ]

  renderTitle() {
    return <div className={styles.title}>{t('Audit Records')}</div>
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {this.renderTitle()}
        {this.renderTable()}
      </div>
    )
  }
}
