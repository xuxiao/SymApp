import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  Button,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { inject } from 'mobx-react';

import domainsAction from '../../actions/Domains';
import { utils, module, other } from '../../styles';

@inject('domain', 'entity', 'tag', 'tags')
class Other extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    entity: PropTypes.object.isRequired,
    tags: PropTypes.object.isRequired,
    tag: PropTypes.object.isRequired,
    domain: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      domains: []
    };
  }

  async componentWillMount() {
    const domains = await domainsAction.getDomains();
    this.setState({
      domains: domains.domains
    });
  }

  _goDomains = (uri, stackTitle) => {
    const { domain } = this.props;
    domain.setUri(uri);
    domain.setTitle(stackTitle);
    this.props.navigation.navigate('Domain', { stackTitle });
  };

  _goView = (path) => {
    this.props.navigation.navigate('WebView', { path });
  };

  render() {
    const { entity, tag, tags } = this.props;

    const domainsJSX = this.state.domains.map((item) => {
      const uriArray = item.domainURI.split('/');
      return (<Button
        key={item.oId}
        onPress={() => {
          this._goDomains(`${uriArray[uriArray.length - 1]}`, item.domainTitle);
        }}
        title={item.domainTitle}
      />);
    }
    );

    return (
      <ScrollView style={utils.statusBar}>
        <View style={module.wrap}>
          <TouchableOpacity
            style={module.list}
            onPress={() => { this._goView('activity/checkin'); }}
          >
            <Text>领取今日签到奖励</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
            onPress={() => { this._goView('activity/yesterday-liveness-reward'); }}
          >
            <Text>领取昨日活跃奖励</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
            onPress={() => { this._goView('activity/1A0001'); }}
          >
            <Text>上证博彩</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[module.list, module.listLast]}
            onPress={() => { this._goView('activity/character'); }}
          >
            <Text>字</Text>
          </TouchableOpacity>
        </View>
        <View style={other.domains}>
          {domainsJSX}
        </View>
        <View style={module.wrap}>
          <TouchableOpacity
            style={module.list}
          >
            <Text>优选[开发中]</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
          >
            <Text>同城[开发中]</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
          >
            <Text>此刻[开发中]</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              tag.setUri('book_share');
              tags.setPathname('articles/tag/book_share');
              this.props.navigation.navigate('TagArticles', { stackTitle: '书单' });
            }
            }
          >
            <Text>书单</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[module.list, module.listLast]}
            onPress={() => {
              entity.setPathname('tags');
              this.props.navigation.navigate('List', { stackTitle: '标签' });
            }}
          >
            <Text>标签</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>);
  }
}

export default Other;