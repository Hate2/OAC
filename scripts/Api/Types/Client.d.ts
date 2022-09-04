export declare type ClientOptions = {
    command: {
        enabled?: boolean;
        /**
         * The command prefix
         */
        prefix?: string;
        /**
         * The error message for inputing an invalid command
         */
        invalidCommandError?: string;
        /**
         * The error message for inputing a command without valid permissions
         */
        invalidPermissionsError?: string;
    };
};
