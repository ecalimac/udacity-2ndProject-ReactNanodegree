import React, { Component } from "react";
import { Container, Menu, Icon } from "semantic-ui-react";

class Nav extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <Container>
        <Menu stackable>
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="new poll"
            active={activeItem === "newPoll"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="leader board"
            active={activeItem === "leaderboard"}
            onClick={this.handleItemClick}
          />

          <Menu.Menu icon="labeled" position="right" pointing primary>
            <Menu.Item as="a" name="login">
              Hello, user_name
              <Icon name="user secret" />
            </Menu.Item>
            <Menu.Item as="a" name="Logout">
              Logout
              <Icon name="studiovinari"></Icon>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Container>
    );
  }
}

export default Nav;
