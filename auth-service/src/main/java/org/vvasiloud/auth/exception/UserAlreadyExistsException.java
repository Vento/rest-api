package org.vvasiloud.auth.exception;

/**
 * Created by Aeon on 5/9/2016.
 */
public class UserAlreadyExistsException extends Exception {

    public UserAlreadyExistsException() {}

    public UserAlreadyExistsException(String message) {
        super(message);
    }

    public UserAlreadyExistsException(Throwable cause) {
        super (cause);
    }

    public UserAlreadyExistsException(String message, Throwable cause) {
        super (message, cause);
    }
}
