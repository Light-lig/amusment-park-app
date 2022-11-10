import React from 'react';

const withEmptyData = (WrappedComponent,valor)=>{
    return class WithEmpyData extends React.Component {
        constructor(props){
            super(props)
        }
        render(){
            return this.props[valor].length ===0?
            <div role="status" className="p-4 max-w-sm rounded border border-gray-200 shadow animate-pulse md:p-6 dark:border-gray-700">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
            <div className="mb-10 w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            <div className="flex items-baseline mt-4 space-x-6">
                <div className="w-full h-72 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                <div className="w-full h-56 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                <div className="w-full h-72 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                <div className="w-full h-64 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                <div className="w-full h-80 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                <div className="w-full h-72 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                <div className="w-full h-80 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>:<WrappedComponent {...this.props} />
        }
    }
}

export default withEmptyData;