package com.teamellipsis.dynamic;

import java.io.Serializable;

public interface DynamicApp extends Serializable {
    long serialVersionUID = 7165582299168504283L;

    void fetchState(Object[] state);

    Object[] saveState();
}


//    javac com\example\todo\*java com\teamellipsis\dynamic\DynamicApp.java
//    jar cvf asdlast.jar com
