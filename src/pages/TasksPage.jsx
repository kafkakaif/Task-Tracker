import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Plus, Trash2, Check, Calendar, AlertCircle, Bell } from 'lucide-react';

export default function TasksPage({ navigate }) {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState({ title: '', deadline: '' });
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const interval = setInterval(() => {
      checkDeadlines();
    }, 60000);

    checkDeadlines();
    return () => clearInterval(interval);
  }, [tasks]);

  const checkDeadlines = () => {
    const now = new Date();
    const newNotifications = [];

    tasks.forEach(task => {
      if (task.completed) return;
      
      const deadline = new Date(task.deadline);
      const hoursUntilDeadline = (deadline - now) / (1000 * 60 * 60);

      if (hoursUntilDeadline < 0) {
        newNotifications.push({
          id: task.id,
          message: `"${task.title}" is overdue!`,
          type: 'overdue'
        });
      } else if (hoursUntilDeadline <= 24 && hoursUntilDeadline > 0) {
        newNotifications.push({
          id: task.id,
          message: `"${task.title}" is due soon!`,
          type: 'warning'
        });
      }
    });

    setNotifications(newNotifications);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim() || !newTask.deadline) return;

    const task = {
      id: Date.now(),
      title: newTask.title,
      deadline: newTask.deadline,
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTasks([...tasks, task]);
    setNewTask({ title: '', deadline: '' });
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getTaskStatus = (task) => {
    if (task.completed) return 'completed';
    const now = new Date();
    const deadline = new Date(task.deadline);
    const hoursUntil = (deadline - now) / (1000 * 60 * 60);
    
    if (hoursUntil < 0) return 'overdue';
    if (hoursUntil <= 24) return 'urgent';
    return 'active';
  };

  const formatDeadline = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;
    if (diffDays < 7) return `In ${diffDays} days`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      fontFamily: '"Crimson Pro", "Georgia", serif'
    }}>
      <Navigation navigate={navigate} currentPage="tasks" />

      <div style={{
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{ 
          marginBottom: '2.5rem',
          animation: 'slideIn 0.6s ease-out'
        }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em',
            lineHeight: '1.1'
          }}>
            Your Tasks
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#6c757d',
            fontFamily: '"Work Sans", sans-serif',
            fontWeight: '400'
          }}>
            Stay organized and meet your deadlines
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
          {/* Main Content */}
          <div>
            {/* Add Task Form */}
            <form onSubmit={addTask} style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '16px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05), 0 10px 20px rgba(0,0,0,0.05)',
              marginBottom: '2rem',
              animation: 'slideIn 0.6s ease-out 0.1s both'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                color: '#212529',
                fontFamily: '"Work Sans", sans-serif'
              }}>
                New Task
              </h2>
              
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="What needs to be done?"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  style={{
                    flex: 1,
                    minWidth: '250px',
                    padding: '0.875rem 1rem',
                    border: '2px solid #e9ecef',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    fontFamily: '"Work Sans", sans-serif',
                    transition: 'border-color 0.2s',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#495057'}
                  onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                />
                
                <div style={{ position: 'relative' }}>
                  <Calendar size={18} style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#6c757d',
                    pointerEvents: 'none'
                  }} />
                  <input
                    type="datetime-local"
                    value={newTask.deadline}
                    onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                    style={{
                      padding: '0.875rem 1rem 0.875rem 2.75rem',
                      border: '2px solid #e9ecef',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      fontFamily: '"Work Sans", sans-serif',
                      transition: 'border-color 0.2s',
                      outline: 'none',
                      minWidth: '240px'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#495057'}
                    onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="btn-hover"
                style={{
                  background: '#212529',
                  color: 'white',
                  border: 'none',
                  padding: '0.875rem 2rem',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: '"Work Sans", sans-serif'
                }}
              >
                <Plus size={20} />
                Add Task
              </button>
            </form>

            {/* Filter Tabs */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '1.5rem',
              animation: 'slideIn 0.6s ease-out 0.2s both'
            }}>
              {['all', 'active', 'completed'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="btn-hover"
                  style={{
                    padding: '0.625rem 1.5rem',
                    background: filter === f ? '#212529' : 'white',
                    color: filter === f ? 'white' : '#6c757d',
                    border: filter === f ? 'none' : '2px solid #e9ecef',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontFamily: '"Work Sans", sans-serif',
                    textTransform: 'capitalize'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Tasks List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredTasks.length === 0 ? (
                <div style={{
                  background: 'white',
                  padding: '3rem 2rem',
                  borderRadius: '16px',
                  textAlign: 'center',
                  color: '#adb5bd',
                  fontSize: '1.1rem',
                  fontFamily: '"Work Sans", sans-serif'
                }}>
                  No tasks yet. Add one to get started!
                </div>
              ) : (
                filteredTasks.map((task, index) => {
                  const status = getTaskStatus(task);
                  return (
                    <div
                      key={task.id}
                      className="task-item"
                      style={{
                        background: 'white',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        borderLeft: `4px solid ${
                          status === 'overdue' ? '#dc3545' :
                          status === 'urgent' ? '#ffc107' :
                          status === 'completed' ? '#28a745' :
                          '#6c757d'
                        }`,
                        animationDelay: `${index * 0.05}s`
                      }}
                    >
                      <button
                        onClick={() => toggleComplete(task.id)}
                        className="task-checkbox"
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          border: '2px solid #dee2e6',
                          background: task.completed ? '#28a745' : 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        {task.completed && <Check size={16} color="white" />}
                      </button>

                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontSize: '1.125rem',
                          fontWeight: '600',
                          color: task.completed ? '#adb5bd' : '#212529',
                          textDecoration: task.completed ? 'line-through' : 'none',
                          marginBottom: '0.25rem',
                          fontFamily: '"Work Sans", sans-serif'
                        }}>
                          {task.title}
                        </h3>
                        <p style={{
                          fontSize: '0.9rem',
                          color: status === 'overdue' ? '#dc3545' : 
                                 status === 'urgent' ? '#fd7e14' : '#6c757d',
                          fontFamily: '"Work Sans", sans-serif',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          {status === 'overdue' && <AlertCircle size={14} />}
                          {formatDeadline(task.deadline)}
                        </p>
                      </div>

                      <button
                        onClick={() => deleteTask(task.id)}
                        className="btn-hover"
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#dc3545',
                          cursor: 'pointer',
                          padding: '0.5rem',
                          borderRadius: '8px'
                        }}
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Notifications Sidebar */}
          <div>
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '16px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              position: 'sticky',
              top: '2rem',
              animation: 'slideIn 0.6s ease-out 0.3s both'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
              }}>
                <Bell size={24} color="#212529" />
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#212529',
                  fontFamily: '"Work Sans", sans-serif',
                  margin: 0
                }}>
                  Notifications
                </h2>
              </div>

              {notifications.length === 0 ? (
                <p style={{
                  color: '#adb5bd',
                  fontSize: '0.95rem',
                  fontFamily: '"Work Sans", sans-serif',
                  textAlign: 'center',
                  padding: '2rem 0'
                }}>
                  All caught up! 🎉
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {notifications.map((notif, index) => (
                    <div
                      key={notif.id}
                      className="notification-item"
                      style={{
                        padding: '1rem',
                        background: notif.type === 'overdue' ? '#fff5f5' : '#fff8e1',
                        borderRadius: '10px',
                        borderLeft: `4px solid ${notif.type === 'overdue' ? '#dc3545' : '#ffc107'}`,
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      <p style={{
                        margin: 0,
                        fontSize: '0.9rem',
                        color: '#212529',
                        fontFamily: '"Work Sans", sans-serif',
                        fontWeight: '500'
                      }}>
                        {notif.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Stats */}
              <div style={{
                marginTop: '2rem',
                paddingTop: '1.5rem',
                borderTop: '2px solid #f8f9fa'
              }}>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: '#212529',
                    marginBottom: '0.25rem'
                  }}>
                    {tasks.filter(t => t.completed).length}/{tasks.length}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#6c757d',
                    fontFamily: '"Work Sans", sans-serif'
                  }}>
                    Tasks Completed
                  </div>
                </div>

                <div>
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: '#dc3545',
                    marginBottom: '0.25rem'
                  }}>
                    {tasks.filter(t => !t.completed && getTaskStatus(t) === 'overdue').length}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#6c757d',
                    fontFamily: '"Work Sans", sans-serif'
                  }}>
                    Overdue Tasks
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
