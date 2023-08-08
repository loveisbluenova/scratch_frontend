import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import bindAll from 'lodash.bindall';
import { connect } from 'react-redux';

import { setProjectUnchanged } from '../reducers/project-changed';
import {
    LoadingStates,
    getIsCreatingNew,
    getIsFetchingWithId,
    getIsLoading,
    getIsShowingProject,
    onFetchedProjectData,
    projectError,
    setProjectId
} from '../reducers/project-state';
import {
    activateTab,
    BLOCKS_TAB_INDEX
} from '../reducers/editor-tab';

import log from './log';
import storage from './storage';
import axios from 'axios';

/* Higher Order Component to provide behavior for loading projects by id. If
 * there's no id, the default project is loaded.
 * @param {React.Component} WrappedComponent component to receive projectData prop
 * @returns {React.Component} component with project loading behavior
 */
const ProjectFetcherHOC = function (WrappedComponent) {
    class ProjectFetcherComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                projectData: ""
            }
            bindAll(this, [
                'fetchProject'
            ]);
            storage.setProjectHost(props.projectHost);
            storage.setProjectToken(props.projectToken);
            storage.setAssetHost(props.assetHost);
            storage.setTranslatorFunction(props.intl.formatMessage);
            // props.projectId might be unset, in which case we use our default;
            // or it may be set by an even higher HOC, and passed to us.
            // Either way, we now know what the initial projectId should be, so
            // set it in the redux store.
            if (
                props.projectId !== '' &&
                props.projectId !== null &&
                typeof props.projectId !== 'undefined'
            ) {
                this.props.setProjectId(props.projectId.toString());
            }
        }

        componentDidMount() {
            axios.get(`http://localhost:8000/api/scratch`, {
                headers: {
                    token: sessionStorage.getItem("token")
                }
            }).then((response) => {
                if (response.data.success) {
                    let stage = response.data.data?.targets[0].stage;

                    let data ={ meta: {
                        semver: '3.0.0',
                        vm: '0.1.0',
                        agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36' // eslint-disable-line max-len
                    }}

                    // console.log('data ==>>> 434', response)
                    // let projectAsset = Object.assign({}, {
                    //     targets:
                    //         response.data.data?.targets[0].sprites.map((val) => {
                    //             if (!val.hasOwnProperty('blocks')) {
                    //                 val.blocks = {}
                    //             }
                    //             if (!val.hasOwnProperty('lists')) {
                    //                 val.lists = {}
                    //             }
                    //             if (!val.hasOwnProperty('broadcasts')) {
                    //                 val.broadcasts = {}
                    //             }
                    //             if (!val.hasOwnProperty('variables')) {
                    //                 val.variables = {}
                    //             }
                    //             return val
                    //         })
                    // },data)

                    // if (!stage.hasOwnProperty('blocks')) {
                    //     stage.blocks = {}
                    // }
                    // if (!stage.hasOwnProperty('lists')) {
                    //     stage.lists = {}
                    // }
                    // if (!stage.hasOwnProperty('broadcasts')) {
                    //     stage.broadcasts = {}
                    // }

                    // projectAsset.targets.push(stage)

                    //  this.setState({projectData: projectAsset})
                    // console.log('projectAsset', this.state.projectData)
                }
            }).catch(err => {
                this.props.onError(err);
                console.log(err);
            })
        }

        componentDidUpdate(prevProps) {
            if (prevProps.projectHost !== this.props.projectHost) {
                storage.setProjectHost(this.props.projectHost);
            }
            if (prevProps.projectToken !== this.props.projectToken) {
                storage.setProjectToken(this.props.projectToken);
            }
            if (prevProps.assetHost !== this.props.assetHost) {
                storage.setAssetHost(this.props.assetHost);
            }
            console.log('projectAsset', this.state.projectData)
            console.log('projectAsset', this.props.isFetchingWithId , prevProps.isFetchingWithId )
            if (this.props.isFetchingWithId && prevProps.isFetchingWithId ) {
                this.fetchProject(this.props.reduxProjectId, this.props.loadingState);
                console.log('projectAsset', this.state.projectData)
            }
            if (this.props.isShowingProject && !prevProps.isShowingProject) {
                this.props.onProjectUnchanged();
            }
            if (this.props.isShowingProject && (prevProps.isLoadingProject || prevProps.isCreatingNew)) {
                this.props.onActivateTab(BLOCKS_TAB_INDEX);
            }
        }
        fetchProject = async (projectId, loadingState) => {
            console.log('storage', storage,projectId)
            return storage
                // eslint-disable-next-line indent
                .load(storage.AssetType.Project, projectId, storage.DataFormat.JSON)
                // eslint-disable-next-line indent
                .then(projectAsset => {
                    if (projectAsset) {
                        // eslint-disable-next-line no-console
                        console.log('projectAsset ', JSON.stringify(this.state.projectData));   

                        // this.props.onFetchedProjectData(JSON.stringify(this.state.projectData), loadingState);
                        // eslint-disable-next-line no-console
                        console.log('projectAsset.data', JSON.parse(projectAsset.data));
                        this.props.onFetchedProjectData(projectAsset.data, loadingState);
                    } else {
                        // Treat failure to load as an error
                        // Throw to be caught by catch later on
                        throw new Error('Could not find project');
                    }
                })
                .catch(err => {
                    // this.props.onError(err);
                    console.log('err', err)
                    // log.error(err);
                });
        }
        render() {
            const {
                /* eslint-disable no-unused-vars */
                assetHost,
                intl,
                isLoadingProject: isLoadingProjectProp,
                loadingState,
                onActivateTab,
                onError: onErrorProp,
                onFetchedProjectData: onFetchedProjectDataProp,
                onProjectUnchanged,
                projectHost,
                projectId,
                reduxProjectId,
                setProjectId: setProjectIdProp,
                /* eslint-enable no-unused-vars */
                isFetchingWithId: isFetchingWithIdProp,
                ...componentProps
            } = this.props;
            return (
                <WrappedComponent
                    fetchingProject={isFetchingWithIdProp}
                    {...componentProps}
                />
            );
        }
    }
    ProjectFetcherComponent.propTypes = {
        assetHost: PropTypes.string,
        canSave: PropTypes.bool,
        intl: intlShape.isRequired,
        isCreatingNew: PropTypes.bool,
        isFetchingWithId: PropTypes.bool,
        isLoadingProject: PropTypes.bool,
        isShowingProject: PropTypes.bool,
        loadingState: PropTypes.oneOf(LoadingStates),
        onActivateTab: PropTypes.func,
        onError: PropTypes.func,
        onFetchedProjectData: PropTypes.func,
        onProjectUnchanged: PropTypes.func,
        projectHost: PropTypes.string,
        projectToken: PropTypes.string,
        projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        reduxProjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        setProjectId: PropTypes.func
    };
    ProjectFetcherComponent.defaultProps = {
        assetHost: 'https://assets.scratch.mit.edu',
        projectHost: 'https://projects.scratch.mit.edu'
    };

    const mapStateToProps = state => ({
        isCreatingNew: getIsCreatingNew(state.scratchGui.projectState.loadingState),
        isFetchingWithId: getIsFetchingWithId(state.scratchGui.projectState.loadingState),
        isLoadingProject: getIsLoading(state.scratchGui.projectState.loadingState),
        isShowingProject: getIsShowingProject(state.scratchGui.projectState.loadingState),
        loadingState: state.scratchGui.projectState.loadingState,
        reduxProjectId: state.scratchGui.projectState.projectId
    });
    const mapDispatchToProps = dispatch => ({
        onActivateTab: tab => dispatch(activateTab(tab)),
        onError: error => dispatch(projectError(error)),
        onFetchedProjectData: (projectData, loadingState) =>
            dispatch(onFetchedProjectData(projectData, loadingState)),
        setProjectId: projectId => dispatch(setProjectId(projectId)),
        onProjectUnchanged: () => dispatch(setProjectUnchanged())
    });
    // Allow incoming props to override redux-provided props. Used to mock in tests.
    const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(
        {}, stateProps, dispatchProps, ownProps
    );
    return injectIntl(connect(
        mapStateToProps,
        mapDispatchToProps,
        mergeProps
    )(ProjectFetcherComponent));
};

export {
    ProjectFetcherHOC as default
};
