function ProgressBar ({ remaining }) {
  return (
    <div className='progress-bar'>
      <div className={`progress-status ${
        Number(remaining) === 0
          ? 'completed-0'
          : remaining > 0 && remaining <= 10
            ? 'completed-10'
            : remaining > 10 && remaining <= 20
              ? 'completed-20'
              : remaining > 20 && remaining <= 30
                ? 'completed-30'
                : remaining > 30 && remaining <= 40
                  ? 'completed-40'
                  : remaining > 40 && remaining <= 50
                    ? 'completed-50'
                    : remaining > 50 && remaining <= 60
                      ? 'completed-60'
                      : remaining > 60 && remaining <= 70
                        ? 'completed-70'
                        : remaining > 70 && remaining <= 80
                          ? 'completed-80'
                          : remaining > 90 && remaining < 100
                            ? 'completed-90'
                            : 'completed-100'

      }`}>
        <span className='progress-label'>{remaining}%</span>
      </div>
    </div>
  )
}

export default ProgressBar
