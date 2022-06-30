/* import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import Header from '../Header'
import './index.css'
 const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class MyProfile extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    myProfileList: [],
    postsList: [],
    storiesList: [],
  }
  componentDidMount() {
    this.renderMyProfile()
  }
  renderMyProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      //  console.log(data)
      const newData = {
        followersCount: data.profile.followers_count,
        id: data.profile.id,
        followingCount: data.profile.following_count,
        postsCount: data.profile.posts_count,
        profilePic: data.profile.profile_pic,
        userBio: data.profile.user_bio,
        userId: data.profile.user_id,
        userName: data.profile.user_name,
      }
      //  console.log(newData)
      const postsData = data.profile.posts.map(eachItem => ({
        postId: eachItem.id,
        image: eachItem.image,
      }))
      //  console.log(postsData)
      const storiesData = data.profile.stories.map(eachStory => ({
        storyId: eachStory.id,
        storyImage: eachStory.image,
      }))
      //  console.log(storiesData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        myProfileList: newData,
        postsList: postsData,
        storiesList: storiesData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }
  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={25} width={25} />
    </div>
  )
  onClickTryAgainMyProfile = () => {
    this.renderMyProfile()
  }
  renderMyProfileList = () => {
    const {myProfileList, storiesList, postsList} = this.state
    const {
      followersCount,
      followingCount,
      postsCount,
      profilePic,
      userBio,
      userName,
      userId,
    } = myProfileList
    return (
      <>
        <Header />
        <div className="user-profile-main-con">
          <div className="mobile-view">
            <h1 className="username-mobile">{userName}</h1>
            <div className="image-followers-following-posts-container">
              <img src={profilePic} alt="my profile" className="profilePic" />
              <div className="desktop">
                <p className="username-desktop">{userName}</p>
                <ul className="subCons-container">
                  <li className="subCon">
                    <p className="count">{postsCount}</p>
                    <p className="count-heading">posts</p>
                  </li>
                  <li className="subCon">
                    <p className="count">{followersCount}</p>
                    <p className="count-heading">followers</p>
                  </li>
                  <li className="subCon">
                    <p className="count">{followingCount}</p>
                    <p className="count-heading">following</p>
                  </li>
                </ul>
                <p className="username-main-desktop">{userId}</p>
                <p className="bio-desktop">{userBio}</p>
              </div>
            </div>
            <h1 className="username-main-mobile">{userId}</h1>
            <h1 className="bio-mobile">{userBio}</h1>
          </div>
          <div className="desktop-view-styling">
            <ul className="story-container">
              {storiesList.map(eachItem => (
                <li key={eachItem.storyId} storyDetails={eachItem}>
                  <img
                    src={eachItem.storyImage}
                    alt="my story"
                    className="myStoryImage"
                  />
                </li>
              ))}
            </ul>
            <hr className="line" />
            <div className="icon-heading-con">
              <BsGrid3X3 className="posts-icon" />
              <h1 className="posts-heading">Posts</h1>
            </div>
            {postsList.length > 0 ? (
              <ul className="my-posts-container">
                {postsList.map(eachItem => (
                  <li
                    className="list-item-my-profile"
                    key={eachItem.postId}
                    postsDetails={eachItem}
                  >
                    <img
                      src={eachItem.image}
                      alt="my post"
                      className="my-image"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="no-posts-display">
                <div className="icon-con">
                  <BiCamera className="no-posts-icon" />
                </div>
                <h1 className="no-posts-para">No Posts</h1>
              </div>
            )}
          </div>
        </div>
      </>
    )
  }
  renderFailure = () => (
    <div className="fail-con">
      <img
        src="https://res.cloudinary.com/dmu5r6mys/image/upload/v1645288486/Group_7737_m7roxw.png"
        alt="failure view"
        className="failure view"
      />
      <p className="fail-heading">Something went wrong. Please try again</p>
      <button
        className="fail-retry"
        type="button"
        onClick={this.onClickTryAgainMyProfile}
      >
        Try again
      </button>
    </div>
  )
  renderAllMyProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMyProfileList()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }
  render() {
    return (
      <div className="myProfile-container">{this.renderAllMyProfile()}</div>
    )
  }
} */

import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import Loader from 'react-loader-spinner'

import './index.css'

import Header from '../Header'

class MyProfile extends Component {
  state = {
    apiStatus: '',
    DataList: [],
    postList: [],
    storiesList: [],
  }

  componentDidMount() {
    this.fetchUserData()
  }

  onClickTryAgain = () => this.fetchUserData()

  fetchUserData = async () => {
    this.setState({
      apiStatus: 'INPROGRESS',
    })
    const jwtToken = Cookies.get('jwt_token')

    const profileUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.setState({apiStatus: 'SUCCESS'})
      const postData = data.profile.posts.map(eachItem => ({
        postId: eachItem.id,
        postImage: eachItem.image,
      }))
      const storiesData = data.profile.stories.map(eachItem => ({
        id: eachItem.id,
        image: eachItem.image,
      }))
      const fetchedData = {
        followerCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        id: data.profile.id,
        postsCount: data.profile.posts_count,
        profilePic: data.profile.profile_pic,
        userBio: data.profile.user_bio,
        userId: data.profile.user_id,
        userName: data.profile.user_name,
      }
      this.setState({
        DataList: fetchedData,
        postList: postData,
        storiesList: storiesData,
      })
    } else {
      this.setState({
        apiStatus: 'FAILURE',
      })
    }
  }

  renderInfoContainer = () => {
    const {DataList} = this.state
    return (
      <div className="infoContainer">
        <img
          src={DataList.profilePic}
          alt="my profile"
          className="myProfilePic"
        />
        <div className="textContainer">
          <h1 className="userNameProfile">{DataList.userName}</h1>
          <div className="followersContainer">
            <p className="infoText">
              <span>{DataList.postsCount}</span>posts
            </p>
            <p className="infoText">
              <span>{DataList.followerCount}</span>followers
            </p>
            <p className="infoText">
              <span>{DataList.followingCount}</span> following
            </p>
          </div>
          <p className="userId">{DataList.userId}</p>
          <p className="infoText">{DataList.userBio}</p>
        </div>
      </div>
    )
  }

  renderStoriesContainer = () => {
    const {storiesList} = this.state
    const storyAlt = 'my story'

    return (
      <ul className="storiesContainer">
        {storiesList.map(eachItem => (
          <li className="listItem" key={eachItem.image}>
            <img src={eachItem.image} alt={storyAlt} className="storyImage" />
          </li>
        ))}
      </ul>
    )
  }

  renderPostContainer = () => {
    const {postList} = this.state
    const postAlt = 'my post'
    return (
      <div className="myProfilePostsContainer">
        <hr className="line" />
        <div className="headLogo">
          <div>
            <BsGrid3X3 />
          </div>
          <div>
            <h1>Posts</h1>
          </div>
        </div>
        <ul className="myPosts">
          {postList.map(eachItem => (
            <li className="myProfilePostsItem" key={eachItem.postId}>
              <img src={eachItem.postImage} alt={postAlt} />
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderNoPostsContainer = () => (
    <div className="noProfilePostsContainer">
      <BiCamera />
      <h1>No Posts</h1>
    </div>
  )

  renderSuccessView = () => {
    const {postList} = this.state
    if (postList.length === 0) {
      return this.renderNoPostsContainer()
    }
    return this.renderPostContainer()
  }

  renderFinalView = () => (
    <div className="user-profile-container">
      {this.renderInfoContainer()}
      {this.renderStoriesContainer()}
      {this.renderSuccessView()}
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failureContainer">
      <img
        src="https://res.cloudinary.com/dyyexkznb/image/upload/v1647771626/alert-triangle_n6ddqk.jpg"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button
        type="button"
        className="tryAgainButton"
        onClick={this.onClickTryAgain}
      >
        Try again
      </button>
    </div>
  )

  renderPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'INPROGRESS':
        return this.renderLoadingView()
      case 'SUCCESS':
        return this.renderFinalView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="myProfileContainer">
          <div className="contentContainer">{this.renderPage()}</div>
        </div>
      </>
    )
  }
}

export default MyProfile
